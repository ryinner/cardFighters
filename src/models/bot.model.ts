import { DEFAULT_TIME_BETWEEN_BOT_ACTIONS } from '../consts/cardsSettings.consts';
import type { BotSettings } from '../types/bot.type';
import type { CardsFighters } from '../types/cardsFighters.types';
import actionModel from './action.model';
import attackModel from './attack.model';
import healModel from './heal.model';
import healerModel from './healer.model';

export default class {
    private readonly cardHealPowerPriority: number;
    private readonly cardAttackPowerPriority: number;
    private readonly cardLeftHpPriority: number;

    private readonly botCards: CardsFighters[];
    private readonly playersCards: CardsFighters[];

    constructor (botSettings: BotSettings) {
        this.cardHealPowerPriority = botSettings.healPower;
        this.cardAttackPowerPriority = botSettings.attackPower;
        this.cardLeftHpPriority = botSettings.leftHp;
        this.botCards = botSettings.botCards;
        this.playersCards = botSettings.playerCards;
    }

    public async makeActions (): Promise<void> {
        this.botCards.forEach(fighter => {
            if (fighter.isAlive) {
                Object.values(fighter.actions).forEach((actionType, typeIndex) => {
                    actionType.actions.forEach(async (action, index) => {
                        await new Promise(resolve => {
                            setTimeout(() => { this.getTarget(action); resolve(true); }, (typeIndex + index) * DEFAULT_TIME_BETWEEN_BOT_ACTIONS);
                        });
                    });
                });
            }
        });
    }

    private getTarget (action: actionModel): void {
        let target!: CardsFighters;
        if (action instanceof healModel) {
            target = this.getHealTarget();
        }
        if (action instanceof attackModel) {
            target = this.getAttackTarget();
        }
        action.tryAction(target);
    }

    private getHealTarget(): CardsFighters {
        const target = this.getAlive(this.botCards).sort((a, b) => (b.maxHealPoints - b.hp) - (a.maxHealPoints - a.hp));

        return target[0];
    }

    private getAttackTarget(): CardsFighters {
        const alivePlayersFighters = this.getAlive(this.playersCards);

        const map = alivePlayersFighters.map(fighter => {
            const attackPower = fighter.actions.attack.actions.reduce((accum, action) => accum += action.power, 0);
            const healPower = fighter instanceof healerModel ? fighter.actions.heal.actions.reduce((accum, action) => accum += action.power, 0) : 0;

            const priority = this.cardAttackPowerPriority * attackPower + this.cardLeftHpPriority * fighter.hp + this.cardHealPowerPriority * healPower;
            return { fighter, priority: priority };
        });

        return map.sort((a, b) => b.priority - a.priority)[0].fighter;
    }

    private getAlive(fighters: CardsFighters[]): CardsFighters[] {
        return fighters.filter(fighter => fighter.isAlive);
    }
}
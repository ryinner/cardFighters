import { DEFAULT_TIME_BETWEEN_BOT_ACTIONS } from '../consts/cardsSettings.consts';
import getAbstractPowerLevelFunctional from '../functional/getAbstractPowerLevel.functional.';
import type { BotSettings } from '../types/bot.type';
import type { CardsFighters } from '../types/cardsFighters.types';
import actionModel from './action.model';
import attackModel from './attack.model';
import healModel from './heal.model';

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
        for (const fighter of this.botCards) {
            if (fighter.isAlive) {
                const actions = Object.values(fighter.actions);
                for (const actionType of actions) {
                    for (const action of actionType.actions) {
                        await new Promise(resolve => {
                            setTimeout(() => { this.getTarget(action); resolve(true); }, DEFAULT_TIME_BETWEEN_BOT_ACTIONS);
                        });
                    }
                }
            }
        }
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
        const map: { fighter: CardsFighters; priority: number }[] = [];
        this.botCards.forEach(fighter => {
            if (fighter.isAlive && fighter.maxHealPoints !== fighter.hp) {
                const priority = getAbstractPowerLevelFunctional(fighter, { healPower: this.cardHealPowerPriority, attackPower: this.cardAttackPowerPriority, leftHp: this.cardLeftHpPriority });

                map.push({ fighter, priority});
            }
        });

        return map.sort((a, b) => b.priority - a.priority)[0].fighter;
    }

    private getAttackTarget(): CardsFighters {
        const alivePlayersFighters = this.getAlive(this.playersCards);

        const map = alivePlayersFighters.map(fighter => {
            const priority = getAbstractPowerLevelFunctional(fighter, { healPower: this.cardHealPowerPriority, attackPower: this.cardAttackPowerPriority, leftHp: this.cardLeftHpPriority });
            return { fighter, priority: priority };
        });

        return map.sort((a, b) => b.priority - a.priority)[0].fighter;
    }

    private getAlive(fighters: CardsFighters[]): CardsFighters[] {
        return fighters.filter(fighter => fighter.isAlive);
    }
}
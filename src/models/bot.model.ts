import type { BotSettings } from '../types/bot.type';
import type { CardsFighters } from '../types/cardsFighters.types';
import actionModel from './action.model';
import attackModel from './attack.model';
import healModel from './heal.model';

export default class {
    private readonly cardHealPowerPriority: number;
    private readonly cardAttackPowerPriority: number;
    private readonly cardLeftHpPowerPriority: number;

    private readonly botCards: CardsFighters[];
    private readonly playersCards: CardsFighters[];

    constructor (botSettings: BotSettings) {
        this.cardHealPowerPriority = botSettings.healPower;
        this.cardAttackPowerPriority = botSettings.attackPower;
        this.cardLeftHpPowerPriority = botSettings.leftHp;
        this.botCards = botSettings.botCards;
        this.playersCards = botSettings.playerCards;
    }

    public makeActions (): void {
        this.botCards.forEach(fighter => {
            Object.values(fighter.actions).forEach(actionType => {
                actionType.actions.forEach(action => {
                    this.getTarget(action);
                });
            });
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
        const aliveBotsFighters = this.botCards.filter(fighter => fighter.isAlive);

        return aliveBotsFighters[0];
    }

    private getAttackTarget(): CardsFighters {
        const alivePlayersFighters = this.playersCards.filter(fighter => fighter.isAlive);
        const sorted = alivePlayersFighters.sort((leftFighter, rightFighter) => {
            const sort = { hpDeference: 0, attackDeference: 0, canHealDeference: 0 };
            sort.hpDeference = leftFighter.hp - rightFighter.hp;
            sort.attackDeference = leftFighter.actions.attack.actions.reduce((accum, action) => accum += action.power, 0) - rightFighter.actions.attack.actions.reduce((accum, action) => accum += action.power, 0);
            const isLeftHealer = leftFighter instanceof healModel;
            const isRightHealer = rightFighter instanceof healModel;

            if (!isLeftHealer && isRightHealer) {
                sort.canHealDeference = 0;
            }
            if (isLeftHealer && !isRightHealer) {
                sort.canHealDeference = 1;
            }

            let result!: number;

            if (sort.hpDeference) {
                result = this.cardHealPowerPriority;
            }

            return result;
        });

        return sorted[0];
    }
}
import healerModel from '../models/healer.model';
import { PriorityWeight } from '../types/bot.type';
import { CardsFighters } from '../types/cardsFighters.types';
import getAbstractPowerByAction from './getAbstractPowerByAction.functional';
import getAbstractPowerByHpFunctional from './getAbstractPowerByHp.functional';

export default function (card: CardsFighters, priority: PriorityWeight): number {
    const { attackPower, leftHp, healPower } = priority;

    const leftHpWeight = leftHp * getAbstractPowerByHpFunctional(card.hp, card.maxHealPoints);
    const attackWeight = attackPower * getAbstractPowerByAction(card.actions.attack.actions);

    const healActions = card instanceof healerModel ? card.actions.heal.actions : [];

    const healPowerWeight = healPower * getAbstractPowerByAction(healActions);

    return attackWeight + leftHpWeight + healPowerWeight;
}

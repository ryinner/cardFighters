import { ActionsTypes } from '../types/actions.type';
import type { CardsFighters } from '../types/cardsFighters.types';
import actionModel from './action.model';

export default class extends actionModel {
    constructor(power: number) {
        super(ActionsTypes.heal, power);
    }

    tryAction(target: CardsFighters): boolean {
        if (!target.isAlive) {
            return false;
        }
        target.takeHeal(this.power);
        return true;
    }
}
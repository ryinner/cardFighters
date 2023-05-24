import { ActionsTypes } from '../types/actions.type';
import type { CardsFighters } from '../types/cardsFighters.types';
import actionModel from './action.model';

export default class extends actionModel {
    constructor(power: number) {
        super(ActionsTypes.attack, power);
    }

    tryAction(target: CardsFighters): boolean {
        if (!target.isAlive) {
            return false;
        }
        target.takeDamage(this.power);
        return true;
    }
}
import sword from '../assets/free-icon-sword-65741.png';
import type { ActionsTypes } from '../types/actions.type';
import type { CardsFighters } from '../types/cardsFighters.types';
import actionModel from './action.model';

export default class extends actionModel {
    constructor(power: number) {
        super(ActionsTypes.attack, power);
        this.image = sword;
    }

    tryAction(target: CardsFighters): boolean {
        target.takeDamage(this.power);
        return true;
    }
}
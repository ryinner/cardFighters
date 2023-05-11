import heal from '../assets/free-icon-heart-8298449.png';
import { ActionsTypes } from '../types/actions.type';
import type { CardsFighters } from '../types/cardsFighters.types';
import actionModel from './action.model';

export default class extends actionModel {
    constructor(power: number) {
        super(ActionsTypes.heal, power);
        this.image = heal;
    }

    tryAction(target: CardsFighters): boolean {
        target.takeHeal(this.power);
        return true;
    }
}
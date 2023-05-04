import type { Healer } from '../types/cards.type';
import WightModel from './wight.model';

export default class extends WightModel {
    private healingPower: number;

    constructor (cardRaw: Healer) {
        super(cardRaw);

        this.healingPower = cardRaw.healthPoints;
    }

    public heal (target: WightModel) {
        target.takeHeal(this.healingPower);
    }
};

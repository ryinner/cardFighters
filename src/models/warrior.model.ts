import type { Warrior } from '../types/cards.type';
import WightModel from './wight.model';

export default class extends WightModel {
    private damage: number;

    constructor (cardRaw: Warrior) {
        super(cardRaw);
        this.damage = cardRaw.damage;
    }

    public attack (target: WightModel) {
        target.takeDamage(this.damage);
    }
};

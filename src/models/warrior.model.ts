import type { Warrior } from '../types/cards.type';
import WightModel from './wight.model';

export default class extends WightModel {
    constructor (cardRaw: Warrior) {
        super(cardRaw);
    }
}

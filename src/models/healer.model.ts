import type { Healer } from '../types/cards.type';
import WightModel from './wight.model';

export default class extends WightModel {
    constructor (cardRaw: Healer) {
        super(cardRaw);
    }
}

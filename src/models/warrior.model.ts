import type { WarriorActions } from '../types/actions.type';
import type { Warrior } from '../types/cards.type';
import WightModel from './wight.model';

export default class extends WightModel <WarriorActions> {
    constructor (cardRaw: Warrior) {
        super(cardRaw);
    }
}

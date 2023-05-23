import type { HealerActions } from '../types/actions.type';
import type { Healer } from '../types/cards.type';
import WightModel from './wight.model';

export default class extends WightModel <HealerActions> {
    constructor (cardRaw: Healer) {
        super(cardRaw);
    }
}

import HealerModel from '../models/healer.model';
import WarriorModel from '../models/warrior.model';
import type { Card } from '../types/cards.type';
import type { CardsFighters } from '../types/cardsFighters.types';

export default function (cardRaw: Card): CardsFighters {
    switch (cardRaw.type) {
        case 'warrior':
            return new WarriorModel(cardRaw);
        case 'healer':
            return new HealerModel(cardRaw);
    }
}

import { CardsFighters } from './cardsFighters.types';

export interface PriorityWeight {
    healPower: number;
    attackPower: number;
    leftHp: number;
}

export interface BotSettings extends PriorityWeight {
    botCards: CardsFighters[];
    playerCards: CardsFighters[];
}
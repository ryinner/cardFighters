import { CardsFighters } from './cardsFighters.types';

export interface BotSettings {
    healPower: number;
    attackPower: number;
    leftHp: number;
    botCards: CardsFighters[];
    playerCards: CardsFighters[];
}
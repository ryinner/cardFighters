export enum CardsFightersEvents {
    takeDamage = 'takeDamage',
    heal = 'heal',
    die = 'die'
}

export type CardsFighterEventHandler = (eventValue?: number | boolean) => void;
export type CardsFightersEventsHandlers = Record<CardsFightersEvents, CardsFighterEventHandler[]>;

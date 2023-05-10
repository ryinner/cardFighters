import type { Action, AllClassesAction, HealerActions, WarriorActions } from './actions.type';

interface AbstractCard {
    id: number;
    name: string;
    description: string;
    image: string;
    coast: number;
}

export interface Wight<FighterType extends AllClassesAction> extends AbstractCard {
    healthPoints: number;
    actions: Action<FighterType>[];
}

export interface Warrior extends Wight <WarriorActions>{
    type: 'warrior';
}

export interface Healer extends Wight <HealerActions> {
    type: 'healer';
}

export type Card = Warrior | Healer;

interface AbstractCard {
    name: string;
    description: string;
    image: string;
    coast: number;
}

export interface Wight extends AbstractCard {
    healthPoints: number;
}

export interface Warrior extends Wight {
    type: 'warrior';
    damage: number;
}

export interface Healer extends Wight {
    type: 'healer';
    healPoints: number;
}

export type Card = Warrior | Healer;

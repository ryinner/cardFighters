export enum ActionsTypes {
    attack,
    heal
}

export type WarriorActions = ActionsTypes.attack;

export type HealerActions = ActionsTypes.attack | ActionsTypes.heal;

export type AllClassesAction = WarriorActions | HealerActions;

export interface Action <FighterActions extends AllClassesAction> {
    name: FighterActions;
    quantity?: number;
    power?: number;
}

import attackModel from '../models/attack.model';
import healModel from '../models/heal.model';
import { Action, ActionsTypes, AllClassesAction } from '../types/actions.type';
import type { FormedActions } from '../types/actionsFormed.type';

export default function (actions: Action<AllClassesAction>[]): FormedActions[] {
    const formedAction: FormedActions[] = [];

    actions.forEach(action => {
        const quantity = action.quantity ? action.quantity : 1;

        for (let index = 0; index < quantity; index++) {
            const power = action.power ?? 1;
            switch (action.name) {
                case ActionsTypes.attack:
                    formedAction.push(new attackModel(power));
                    break;
                case ActionsTypes.heal:
                    formedAction.push(new healModel(power));
                    break;
            }
        }
    });
    return formedAction;
}
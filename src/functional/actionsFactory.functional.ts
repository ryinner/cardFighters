import attackModel from '../models/attack.model';
import healModel from '../models/heal.model';
import { ActionsTypes, type Action, type AllClassesAction } from '../types/actions.type';
import type { AvailableActions, FormedActions } from '../types/actionsFormed.type';

export default function (actions: Action<AllClassesAction>[]): FormedActions {
    const formedAction: FormedActions = {};

    actions.forEach(action => {
        const quantity = action.quantity ?? 1;
        if (quantity <= 0) {
            throw new Error('Actions quantity can\'t be less 1');
        }
        for (let index = 0; index < quantity; index++) {
            const power = action.power ?? 1;
            let actionModel!: AvailableActions;
            switch (action.name) {
                case ActionsTypes.attack:
                    actionModel = new attackModel(power);
                    break;
                case ActionsTypes.heal:
                    actionModel = new healModel(power);
                    break;
            }
            if (!formedAction[action.name] || !Array.isArray(formedAction[action.name])) {
                formedAction[action.name] = [];
            }
            formedAction[action.name]?.push(actionModel);
            if (!formedAction[action.name]?.length) {
                throw new Error('Cards actions length is zero or undefined');
            }
        }
    });
    return formedAction;
}
import heal from '../assets/free-icon-heart-8298449.png';
import sword from '../assets/free-icon-sword-65741.png';
import actionModel from '../models/action.model';
import attackModel from '../models/attack.model';
import healModel from '../models/heal.model';
import { ActionsTypes, type Action, type AllClassesAction } from '../types/actions.type';
import type { FormedActions } from '../types/actionsFormed.type';

export default function (actions: Action<AllClassesAction>[]): FormedActions <AllClassesAction> {
    const formedActions: Partial<FormedActions<AllClassesAction>> = {};
    let image!: string;

    actions.forEach(action => {
        const { quantity = 1, power = 1, name } = action;

        if (quantity <= 0) {
            throw new Error('Actions quantity can\'t be less 1');
        }
        for (let index = 0; index < quantity; index++) {
            let actionModel!: actionModel;
            switch (name) {
                case ActionsTypes.attack:
                    actionModel = new attackModel(power);
                    image = sword;
                    break;
                case ActionsTypes.heal:
                    actionModel = new healModel(power);
                    image = heal;
                    break;
            }

            let formedActionByType = formedActions[name];
            if (!formedActionByType) {
                formedActions[name] = { actions: [], image: image };
                formedActionByType = formedActions[name];
            }
            if (formedActionByType) {
                formedActionByType.actions.push(actionModel);
                if (!formedActionByType.actions.length) {
                    throw new Error('Cards actions length is zero or undefined');
                }
            }
        }
    });
    console.log(formedActions);
    if (!isFormedActionsValid(formedActions)) {
        throw new Error('No actions for cards');
    }
    return formedActions;

    function isFormedActionsValid(object: object): object is FormedActions <AllClassesAction> {
        return Object.keys(object).length > 0;
    }
}
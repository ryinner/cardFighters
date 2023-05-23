import heal from '../assets/free-icon-heart-8298449.png';
import sword from '../assets/free-icon-sword-65741.png';
import actionModel from '../models/action.model';
import attackModel from '../models/attack.model';
import healModel from '../models/heal.model';
import { ActionsTypes, type Action, type AllClassesAction } from '../types/actions.type';
import type { FormedActions } from '../types/actionsFormed.type';

export default function (actions: Action<AllClassesAction>[]): FormedActions <ActionsTypes> {
    let formedAction!: FormedActions<ActionsTypes>;
    let image!: string;

    actions.forEach(action => {
        const quantity = action.quantity ?? 1;
        if (quantity <= 0) {
            throw new Error('Actions quantity can\'t be less 1');
        }
        for (let index = 0; index < quantity; index++) {
            const power = action.power ?? 1;
            let actionModel!: actionModel;
            switch (action.name) {
                case ActionsTypes.attack:
                    actionModel = new attackModel(power);
                    image = sword;
                    break;
                case ActionsTypes.heal:
                    actionModel = new healModel(power);
                    image = heal;
                    break;
            }
            if (!formedAction[action.name] || !Array.isArray(formedAction[action.name])) {
                formedAction[action.name] = { actions: [], image: image };
            }
            formedAction[action.name].actions.push(actionModel);
            if (!formedAction[action.name].actions.length) {
                throw new Error('Cards actions length is zero or undefined');
            }
        }
    });
    return formedAction;
}
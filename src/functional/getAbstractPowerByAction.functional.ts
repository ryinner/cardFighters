import actionModel from '../models/action.model';
import getAllActionsPowerFunctional from './getAllActionsPower.functional';

export default function (attackActions: actionModel[]): number {
    const countActionsWeight = attackActions.length / 3;

    const powerActionsWeight = getAllActionsPowerFunctional(attackActions) / 2;

    return countActionsWeight + powerActionsWeight;
}
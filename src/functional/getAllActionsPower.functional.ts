import actionModel from '../models/action.model';

export default function (actions: actionModel[]): number {
    return actions.reduce((accum, action) => accum += action.power, 0);
}

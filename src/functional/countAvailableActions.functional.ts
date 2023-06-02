import { CardsFighters } from '../types/cardsFighters.types';

export default function (fighters: CardsFighters[]): number {
    return fighters.reduce((accum, fighter) => {
        const actionsTypes = fighter.actions;
        Object.values(actionsTypes).forEach(action => {
            accum += action.actions.filter(action => !action.isActivated).length;
        });
        return accum;
    }, 0);
}

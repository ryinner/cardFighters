import { CardsFighters } from '../types/cardsFighters.types';

export default function (fighters: CardsFighters[]) {
    fighters.forEach(fighter => {
        Object.values(fighter.actions).forEach(action => {
            action.actions.forEach(action => { action.reactivate(); });
        });
    });
}
import attackModel from '../models/attack.model';
import healModel from '../models/heal.model';
import { ActionsTypes } from './actions.type';

export type AvailableActions = attackModel | healModel;

export interface FormedActions {
    [ActionsTypes.attack]?: attackModel[];
    [ActionsTypes.heal]?: healModel[];
}
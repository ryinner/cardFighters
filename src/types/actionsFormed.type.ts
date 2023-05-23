import actionModel from '../models/action.model';
import { ActionsTypes } from './actions.type';


export type Action = { actions: actionModel[]; image: string };
export type FormedActions<T extends ActionsTypes> = Record<T, Action>;
import actionModel from '../models/action.model';
import { ActionsTypes } from './actions.type';

export type FormedActions<T extends ActionsTypes> = Record<T, { actions: actionModel[]; image: string }>;
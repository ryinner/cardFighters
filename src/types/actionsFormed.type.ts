import actionModel from '../models/action.model';
import { ActionsTypes } from './actions.type';

export type FormedActions = Partial<Record<keyof typeof ActionsTypes, actionModel[]>>;
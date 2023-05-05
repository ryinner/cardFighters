import healerModel from '../models/healer.model';
import { CardsFighters } from '../types/cardsFighters.types';

export default function (cardFighter: CardsFighters): cardFighter is healerModel {
    return cardFighter instanceof healerModel;
}
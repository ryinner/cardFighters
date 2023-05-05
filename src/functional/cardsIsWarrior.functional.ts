import warriorModel from '../models/warrior.model';
import { CardsFighters } from '../types/cardsFighters.types';

export default function (cardFighter: CardsFighters): cardFighter is warriorModel {
    return cardFighter instanceof warriorModel;
}
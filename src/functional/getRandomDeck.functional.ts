import { MAX_CARDS_IN_DECK } from '../consts/cardsSettings.consts';
import cardsMap from '../maps/cards.map';

export default function (): typeof cardsMap {
    const mapProxy: typeof cardsMap = [...cardsMap];

    const randomCards: typeof cardsMap = [];
    for (let i = 0; i < MAX_CARDS_IN_DECK; i++) {
        const randomIndex = Math.floor(Math.random() * cardsMap.length);
        const randomItem = mapProxy.splice(randomIndex, 1);
        randomCards.push(...randomItem);        
    }

    return randomCards;
}
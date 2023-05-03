import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { MAX_CARDS_IN_DECK } from '../consts/cardsSettings.consts';
import type { Card } from '../types/cards.type';

export const useUserStore = defineStore('user', () => {
    const cardsRaw = ref<Card[]>([]);
    const isMaxCardsInDeck = computed(() => cardsRaw.value.length === MAX_CARDS_IN_DECK);

    const addCard = (card: Card) => { 
        if (!isMaxCardsInDeck.value) {
            cardsRaw.value.push(card);
        }
    };
    const removeCard = (card: Card) => { cardsRaw.value.splice(cardsRaw.value.indexOf(card), 1); };
    const haveCard = (card: Card) => cardsRaw.value.includes(card);
    const toggleCard = (card: Card) => { haveCard(card) ? removeCard(card) : addCard(card); };

    return {
        cardsRaw,
        isMaxCardsInDeck,
        addCard,
        removeCard,
        toggleCard,
        haveCard
    };
});
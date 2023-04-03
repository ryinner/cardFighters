import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { MAX_CARDS_IN_DECK } from '../consts/cardsSettings.consts';
import type { Card } from '../types/cards.type';

export const useUserStore = defineStore('user', () => {
    const cardsRaw = ref<Card[]>([]);
    const addCard = (card: Card) => { cardsRaw.value.push(card); };
    const removeCard = (card: Card) => { cardsRaw.value.splice(cardsRaw.value.indexOf(card)); };

    const isMaxCardsInDeck = computed(() => cardsRaw.value.length === MAX_CARDS_IN_DECK);

    return {
        cardsRaw,
        isMaxCardsInDeck,
        addCard,
        removeCard
    };
});
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Card } from '../types/cards.type';

export const useUserStore = defineStore('user', () => {
    const cardsRaw = ref<Card[]>([]);
    const addCard = (card: Card) => { cardsRaw.value.push(card); };
    const removeCard = (card: Card) => { cardsRaw.value.splice(cardsRaw.value.indexOf(card)); };

    return {
        cardsRaw,
        addCard,
        removeCard
    };
});
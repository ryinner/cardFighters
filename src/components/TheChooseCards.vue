<script lang="ts" setup>
import { computed } from 'vue';
import { MAX_CARDS_IN_DECK } from '../consts/cardsSettings.consts';
import { useUserStore } from '../state/user.state';

const user = useUserStore();

const isMaxCardsInDeck = computed(() => user.cards.length === MAX_CARDS_IN_DECK);
</script>

<template>
    <div class="choose-cards">
        <h1 class="choose-cards__heading">
            Choose cards for your deck
        </h1>
        <div class="choose-cards__cards">

        </div>
        <div class="choose-cards__counter">
            <span :class="isMaxCardsInDeck ? 'choose-cards__counter--success' : 'choose-cards__counter--error'">
                {{ user.cards.length }}
            </span> 
            / 
            {{ MAX_CARDS_IN_DECK }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.choose-cards {
    &__cards {
        gap: var(--default-gap);
        display: grid;
        grid-template-columns: repeat(12, 1fr);
    }

    &__counter {
        font-size: 1.5rem;

        &--success {
            color: var(--success-color);
        }

        &--error {
            color: var(--error-color);
        }
    }
}
</style>
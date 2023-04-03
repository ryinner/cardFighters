<script lang="ts" setup>
import { MAX_CARDS_IN_DECK } from '../consts/cardsSettings.consts';
import cardsMap from '../maps/cards.map';
import { useUserStore } from '../state/user.state';
import Card from './BaseCard.vue';

const user = useUserStore();

</script>

<template>
    <div class="choose-cards">
        <h1 class="choose-cards__heading">
            Choose cards for your deck
        </h1>
        <div class="choose-cards__cards">
            <Card
                v-for="card in cardsMap"
                :key="card.id"
                :card="card"
                class="choose-cards__item"
            />
        </div>
        <div class="choose-cards__counter">
            <span :class="user.isMaxCardsInDeck ? 'choose-cards__counter--success' : 'choose-cards__counter--error'">
                {{ user.cardsRaw.length }}
            </span>
            /
            {{ MAX_CARDS_IN_DECK }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.choose-cards {
    &__cards {
        margin-top: 2rem;
        gap: var(--default-gap);
        display: grid;
        grid-template-columns: repeat(12, 1fr);
    }

    &__item {
        grid-column: 3 span;
    }

    &__counter {
        font-size: 1.5rem;

        margin-top: 2rem;

        &--success {
            color: var(--success-color);
        }

        &--error {
            color: var(--error-color);
        }
    }
}
</style>
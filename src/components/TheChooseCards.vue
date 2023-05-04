<script lang="ts" setup>
import { MAX_CARDS_IN_DECK } from '../consts/cardsSettings.consts';
import cardsMap from '../maps/cards.map';
import { useUserStore } from '../state/user.state';
import Card from './BaseCard.vue';
import BaseLink from './BaseLink.vue';

const user = useUserStore();

const { toggleCard } = user;
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
                @click="toggleCard(card)"
            />
        </div>
        <div class="choose-cards__counter">
            <span :class="user.isMaxCardsInDeck ? 'choose-cards__counter--success' : 'choose-cards__counter--error'">
                {{ user.cardsRaw.length }}
            </span>
            /
            {{ MAX_CARDS_IN_DECK }}
        </div>
        <div class="choose-cards__link">
            <BaseLink
                :class="{'choose-cards__link--disabled': !user.isMaxCardsInDeck}"
                :to="{ name: 'fight' }"
            >
                Start the game
            </BaseLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../style/mixins/media';
.choose-cards {
    &__cards {
        margin-top: 2rem;

        gap: var(--default-gap);
        display: grid;
        grid-template-columns: repeat(12, 1fr);
    }

    &__item {
        grid-column: 3 span;

        @include for-phone-only {
            grid-column: 6 span;
        }
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

    &__link {
        margin-top: 2rem;

        &--disabled {
            transition: 300ms ease;

            color: var(--inactive-color);

            border-color: var(--inactive-color);

            pointer-events: none;
        }
    }
}
</style>
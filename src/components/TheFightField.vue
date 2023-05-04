<script lang="ts" setup>
import { nextTick, onMounted, ref, Ref } from 'vue';
import cardsFactoryFunctional from '../functional/cardsFactory.functional';
import { useUserStore } from '../state/user.state';
import { CardsFighters } from '../types/cardsFighters.types';
import CardFighter from './CardFighter.vue';

const userStore = useUserStore();

const cardsSize = ref({ width: '0px', height: '0px' });
const cardFightersPlayer: Ref<CardsFighters[]> = ref([]);

const initialize = () => {
    userStore.cardsRaw.forEach(cardRaw => {
        cardFightersPlayer.value.push(cardsFactoryFunctional(cardRaw));
    });
    nextTick(() => {
        const card = document.querySelector('.card-fighter:first-child');
        if (card) {
            const { clientHeight, clientWidth } = card;
            cardsSize.value.height = `${clientWidth}px`;
            cardsSize.value.width = `${clientHeight}px`;
        }
    });
};

onMounted(initialize);
</script>

<template>
    <div class="fight-field">
        <div class="fight-field__graveyard">
            <div class="fight-field__graveyard-player">test</div>
            <div class="fight-field__graveyard-enemy">test</div>
        </div>
        <div class="fight-field__arena">
            <div class="fight-field__player">
                <CardFighter 
                    v-for="fighter in cardFightersPlayer" 
                    :key="fighter.name"
                    :fighter="fighter" 
                />
            </div>
            <div class="fight-field__enemy">
                test
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.fight-field {
    gap: 1.5rem;
    display: grid;
    position: relative;
    grid-template-rows: 0.5fr 1fr;

    &__arena,  &__graveyard{
        display: grid;
        gap: var(--default-gap);
        grid-template-columns: 1fr 1fr;
    }

    &__graveyard {
        grid-row: 1;
    }

    &__arena {
        grid-row: 2;
    }

    &__player, &__enemy {
        gap: var(--default-gap);
        display: grid;
        grid-column: 1 span;
        grid-template-columns: 1fr 1fr 1fr;
    }

    &__graveyard-player, &__graveyard-enemy {
        grid-column: 1 span;
    }
}
</style>
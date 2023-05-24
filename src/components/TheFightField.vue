<script lang="ts" setup>
import { nextTick, onMounted, ref, Ref } from 'vue';
import cardsFactoryFunctional from '../functional/cardsFactory.functional';
import getRandomDeckFunctional from '../functional/getRandomDeck.functional';
import { useUserStore } from '../state/user.state';
import { Action } from '../types/actionsFormed.type';
import { CardsFighters } from '../types/cardsFighters.types';
import CardFighter from './CardFighter.vue';
import ThePlayerActionsPanel from './ThePlayerActionsPanel.vue';

const userStore = useUserStore();

const cardsSize = ref({ width: '0px', height: '0px' });
const cardFightersPlayer: Ref<CardsFighters[]> = ref([]);
const cardFightersEnemy: Ref<CardsFighters[]> = ref([]);
const selectedCardFighter: Ref<CardsFighters | undefined> = ref();
const selectedAction: Ref<Action | undefined> = ref();

const initialize = () => {
    userStore.cardsRaw.forEach(cardRaw => {
        cardFightersPlayer.value.push(cardsFactoryFunctional(cardRaw));
    });
    getRandomDeckFunctional().forEach((cardRaw) => {
        cardFightersEnemy.value.push(cardsFactoryFunctional(cardRaw));
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

const cardClickHandler = (cardFighter: CardsFighters, isPlayerCard: boolean) => {
    if (selectedAction.value) {
        const availableAction = selectedAction.value.actions.find(action => !action.isActivated);
        if (availableAction) {
            availableAction.activate(cardFighter);
            return;
        }
        selectedAction.value = undefined;
    }
    if (selectedCardFighter.value === cardFighter && isPlayerCard) {
        selectedCardFighter.value = undefined;
        selectedAction.value = undefined;
        return;
    }
    if (isPlayerCard) {
        selectedCardFighter.value = cardFighter;
        selectedAction.value = undefined;
        return;
    }
};

onMounted(initialize);
</script>

<template>
    <div class="fight-field">
        <div class="fight-field__graveyard">
            <div class="fight-field__graveyard-player">
                test
            </div>
            <div class="fight-field__graveyard-enemy">
                test
            </div>
        </div>
        <div class="fight-field__arena">
            <div class="fight-field__player">
                <CardFighter
                    v-for="fighter in cardFightersPlayer"
                    :key="fighter.name"
                    :fighter="fighter"
                    :is-player="true"
                    :is-selected="fighter === selectedCardFighter"
                    @click="cardClickHandler(fighter, true)"
                />
            </div>
            <div class="fight-field__enemy">
                <CardFighter
                    v-for="fighter in cardFightersEnemy"
                    :key="fighter.name"
                    :fighter="fighter"
                    :is-player="false"
                    @click="cardClickHandler(fighter, false)"
                />
            </div>
        </div>
        <ThePlayerActionsPanel
            v-model:selected-action="selectedAction"
            :selected-card-fighter="selectedCardFighter"
        />
    </div>
</template>

<style lang="scss" scoped>
.fight-field {
    gap: 1.5rem;
    display: grid;
    position: relative;
    grid-template-rows: 0.5fr 1fr;

    &__arena,
    &__graveyard {
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

    &__player,
    &__enemy {
        gap: var(--default-gap);
        display: grid;
        grid-column: 1 span;
        grid-template-columns: 1fr 1fr 1fr;
    }

    &__graveyard-player,
    &__graveyard-enemy {
        grid-column: 1 span;
    }
}
</style>
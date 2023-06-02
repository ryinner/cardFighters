<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, Ref } from 'vue';
import cardsFactoryFunctional from '../functional/cardsFactory.functional';
import getRandomDeckFunctional from '../functional/getRandomDeck.functional';
import { useUserStore } from '../state/user.state';
import { Action } from '../types/actionsFormed.type';
import { CardsFighters } from '../types/cardsFighters.types';
import BaseGraveyard from './BaseGraveyard.vue';
import CardFighter from './CardFighter.vue';
import ThePlayerActionsPanel from './ThePlayerActionsPanel.vue';

const userStore = useUserStore();

const cardsSize = ref({ width: '0px', height: '0px' });
const cardFightersPlayer: Ref<CardsFighters[]> = ref([]);
const cardFightersEnemy: Ref<CardsFighters[]> = ref([]);
const selectedCardFighter: Ref<CardsFighters | undefined> = ref();
const selectedAction: Ref<Action | undefined> = ref();

const aliveFightersPlayer = computed(() => cardFightersPlayer.value.filter(fighter => fighter.isAlive));
const aliveFightersEnemy = computed(() => cardFightersEnemy.value.filter(fighter => fighter.isAlive));

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
            <BaseGraveyard
                class="fight-field__graveyard-player"
                :is-player="true"
                :cards-fighters="cardFightersPlayer"
                :card-size="cardsSize"
            />
            <BaseGraveyard
                class="fight-field__graveyard-enemy"
                :is-player="false"
                :cards-fighters="cardFightersEnemy"
                :card-size="cardsSize"
            />
        </div>
        <div class="fight-field__arena">
            <div class="fight-field__player">
                <CardFighter
                    v-for="fighter in aliveFightersPlayer"
                    :key="fighter.name"
                    :fighter="fighter"
                    :is-player="true"
                    :is-selected="fighter === selectedCardFighter"
                    @click="cardClickHandler(fighter, true)"
                />
            </div>
            <div class="fight-field__enemy">
                <CardFighter
                    v-for="fighter in aliveFightersEnemy"
                    :key="fighter.name"
                    :fighter="fighter"
                    :is-player="false"
                    @click="cardClickHandler(fighter, false)"
                />
            </div>
            <ThePlayerActionsPanel
                v-model:selected-action="selectedAction"
                :selected-card-fighter="selectedCardFighter"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.fight-field {
    gap: 1.5rem;
    display: grid;

    &__arena,
    &__graveyard {
        display: grid;
        gap: var(--default-gap);
        grid-template-columns: 1fr 1fr;
    }

    &__arena {
        position: relative;
    }


    &__graveyard {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);

        overflow: hidden;

        width: 100%;

        &-player,
        &-enemy {
            position: relative;

            grid-column: 1 span;
        }

        &-player {
            transform: translateX(-60%);

            justify-self: flex-start;
        }

        &-enemy {
            transform: translateX(60%);

            justify-self: flex-end;
        }
    }

    &__player,
    &__enemy {
        gap: var(--default-gap);
        display: grid;
        grid-column: 1 span;
        grid-template-columns: 1fr 1fr 1fr;
    }
}</style>
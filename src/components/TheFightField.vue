<script lang="ts" setup>
import { computed, nextTick, onMounted, onUnmounted, ref, Ref, watch } from 'vue';
import actionReactivateFunctional from '../functional/actionReactivate.functional';
import cardsFactoryFunctional from '../functional/cardsFactory.functional';
import countAvailableActionsFunctional from '../functional/countAvailableActions.functional';
import getRandomDeckFunctional from '../functional/getRandomDeck.functional';
import botModel from '../models/bot.model';
import { useFightStore } from '../state/fight.state';
import { useUserStore } from '../state/user.state';
import { Action } from '../types/actionsFormed.type';
import { CardsFighters } from '../types/cardsFighters.types';
import BaseGraveyard from './BaseGraveyard.vue';
import CardFighter from './CardFighter.vue';
import EndGameScreen from './EndGameScreen.vue';
import ThePlayerActionsPanel from './ThePlayerActionsPanel.vue';
import TheTourInformation from './TheTourInformation.vue';

const userStore = useUserStore();
const fightStore = useFightStore();

const cardsSize = ref({ width: '0px', height: '0px' });
const cardFightersPlayer: Ref<CardsFighters[]> = ref([]);
const cardFightersEnemy: Ref<CardsFighters[]> = ref([]);
const selectedCardFighter: Ref<CardsFighters | undefined> = ref();
const selectedAction: Ref<Action | undefined> = ref();

const aliveFightersPlayer = computed(() => cardFightersPlayer.value.filter(fighter => fighter.isAlive));
const aliveFightersEnemy = computed(() => cardFightersEnemy.value.filter(fighter => fighter.isAlive));
const gameEnd = computed(() => aliveFightersPlayer.value.length === 0 || aliveFightersEnemy.value.length === 0);

const bot = new botModel({ healPower: 3, leftHp: 1.25, attackPower: 1, playerCards: cardFightersPlayer.value, botCards: cardFightersEnemy.value });

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
        fightStore.startGame();
    });
};

const destroy = () => {
    fightStore.endGame();
};

const cardClickHandler = (cardFighter: CardsFighters, isPlayerCard: boolean) => {
    if (!fightStore.isPlayer) {
        return;
    }
    if (selectedAction.value) {
        const availableAction = selectedAction.value.actions.find(action => !action.isActivated);
        if (availableAction) {
            availableAction.activate(cardFighter);
        } else {
            selectedAction.value = undefined;
        }
        if (countAvailableActionsFunctional(aliveFightersPlayer.value) <= 0) {
            selectedCardFighter.value = undefined;
            fightStore.endTour();
            fightStore.startNewTour();
        }
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

const endGame = () => {
    if (gameEnd.value) {
        fightStore.endGame();
    }
};

onMounted(initialize);
onUnmounted(destroy);

watch(
    () => fightStore.isPlayer,
    async () => { 
        if (fightStore.isPlayer) {
            actionReactivateFunctional(cardFightersPlayer.value);
        } else {
            actionReactivateFunctional(cardFightersEnemy.value);
            await bot.makeActions();
            fightStore.startNewTour();
        }
    }
);

watch(
    () => aliveFightersPlayer.value.length,
    endGame
);
watch(
    () => aliveFightersEnemy.value.length,
    endGame
);
</script>

<template>
    <div class="fight-field">
        <TheTourInformation />
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
                <TransitionGroup name="fight-field__list">
                    <CardFighter
                        v-for="fighter in aliveFightersPlayer"
                        :key="fighter.name"
                        :fighter="fighter"
                        :is-player="true"
                        :is-selected="fighter === selectedCardFighter"
                        @click="cardClickHandler(fighter, true)"
                    />
                </TransitionGroup>
            </div>
            <div class="fight-field__enemy">
                <TransitionGroup name="fight-field__list">
                    <CardFighter
                        v-for="fighter in aliveFightersEnemy"
                        :key="fighter.name"
                        :fighter="fighter"
                        :is-player="false"
                        @click="cardClickHandler(fighter, false)"
                    />
                </TransitionGroup>
            </div>
            <ThePlayerActionsPanel
                v-model:selected-action="selectedAction"
                :selected-card-fighter="selectedCardFighter"
            />
        </div>
        <EndGameScreen
            :game-end="gameEnd"
            :is-win="aliveFightersPlayer > aliveFightersEnemy"
        />
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

    &__list {
        &-enter-active,
        &-leave-active {
            transition: all 0.5s ease;
        }
        &-enter-from,
        &-leave-to {
            opacity: 0;
        }
        &-enter-from {
            transform: translate(-2rem, 2rem);
        }
    }
}
</style>
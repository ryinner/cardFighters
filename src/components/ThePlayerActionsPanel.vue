<script lang="ts" setup>
import { computed } from 'vue';
import { MAX_ACTIONS_IN_CARD } from '../consts/cardsSettings.consts';
import { Action } from '../types/actionsFormed.type';
import { CardsFighters } from '../types/cardsFighters.types';
import ActionIcon from './ActionIcon.vue';

const props = defineProps<{
    selectedCardFighter?: CardsFighters;
}>();

// eslint-disable-next-line no-undef
const selectedAction = defineModel<Action | undefined>('selectedAction', {
    required: true
});

const freeSlotsForAction = () => computed(() => {
    let selectedItems = 0;
    if (props.selectedCardFighter) {
        const actionsTypes = props.selectedCardFighter.actions;
        Object.values(actionsTypes).forEach(action => {
            selectedItems += action.actions.length;
        });
    }
    return MAX_ACTIONS_IN_CARD - selectedItems;
});

const actionClickHandler = (action: Action) => {
    if (selectedAction.value === action) {
        selectedAction.value = undefined;
        return;
    }
    selectedAction.value = action;
};
</script>

<template>
    <Transition name="player-actions-panel">
        <div
            v-if="selectedCardFighter"
            class="player-actions-panel"
        >
            <ActionIcon
                v-for="(action, type) in selectedCardFighter.actions"
                :key="type"
                :action="action"
                class="player-actions-panel__item"
                :class="{'player-actions-panel__item--active': action === selectedAction}"
                @click="actionClickHandler(action)"
            />
            <div
                v-for="n in freeSlotsForAction"
                :key="n"
                class="player-actions-panel__item"
            />
        </div>
    </Transition>
</template>

<style lang="scss" scoped>
.player-actions-panel {
    position: fixed;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;

    width: 80%;

    box-shadow: 0 0 10px var(--primary-color);
    background-color: var(--background-on-page-color);

    padding: 1rem 2rem;

    display: flex;
    gap: var(--default-gap);

    &__item {
        width: 100%;
        height: 100%;

        flex: 0 0 4rem;

        padding: 1rem;

        border: 1px solid;
        border-color: var(--primary-color);

        grid-column: 1 span;

        &--active {
            border-color: var(--info-color);
        }
    }

    &-enter-active,
    &-leave-active {
        transition: 300ms ease all;
    }

    &-enter-from,
    &-leave-to {
        opacity: 0;
        transform: translateX(-50%) translateY(1rem);
    }
}</style>
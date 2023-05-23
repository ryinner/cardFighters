<script lang="ts" setup>
import { CardsFighters } from '../types/cardsFighters.types';
import ActionIcon from './ActionIcon.vue';

defineProps<{
    selectedCardFighter?: CardsFighters;
}>();
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
            />
        </div>
    </Transition>
</template>

<style lang="scss" scoped>
.player-actions-panel {
    position: fixed;
    bottom: 1rem;
    width: 80%;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--background-on-page-color);
    box-shadow: 0 0 10px var(--primary-color);
    padding: 1rem 2rem;

    &-enter-active, &-leave-active {
        transition: 300ms ease all;
    }

    &-enter-from, &-leave-to {
        opacity: 0;
        transform: translateX(-50%) translateY(1rem);
    }
}
</style>
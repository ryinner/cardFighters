<script lang="ts" setup>
import { computed } from 'vue';
import type { Action } from '../types/actionsFormed.type';

const props = defineProps<{
    action: Action;
}>();

const availableActionsCount = computed(() => props.action.actions.filter(action => !action.isActivated).length);
</script>

<template>
    <div 
        class="action-icon"
        :class="{'action-icon--disabled': availableActionsCount === 0}"
    >
        <img
            class="action-icon__image"
            :src="action.image"
        />
        <span class="action-icon__count">
            {{ availableActionsCount }}
        </span>
    </div>
</template>

<style lang="scss" scoped>
.action-icon {
    display: flex;
    position: relative;

    &--disabled {
        filter: brightness(0) grayscale(1);
        pointer-events: none;
    }

    &__image {
        width: 100%;
        height: 100%;
        object-fit: fill;
    }

    &__count {
        position: absolute;
        top: 0.2rem;
        right: 0.5rem;

        font-size: 1.2rem;
    }
}
</style>
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
        {{ availableActionsCount }}
    </div>
</template>

<style lang="scss" scoped>
.action-icon {
    display: flex;

    &__image {
        width: 100%;
        height: 100%;
        object-fit: fill;
    }

    &--disabled {
        filter: brightness(0) grayscale(1);
        pointer-events: none;
    }
}
</style>
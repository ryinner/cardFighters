<script lang="ts" setup>
import type { Action } from '../types/actionsFormed.type';

defineProps<{
    action: Action;
}>();
</script>

<template>
    <div class="action-icon">
        <img
            class="action-icon__image"
            :src="action.image"
        />
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
}
</style>
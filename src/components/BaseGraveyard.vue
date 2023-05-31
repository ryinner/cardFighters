<script lang="ts" setup>
import { computed } from 'vue';
import { CardsFighters } from '../types/cardsFighters.types';

const props = defineProps<{
    isPlayer: boolean;
    cardsFighters: CardsFighters[];
    cardSize: {
        width: string;
        height: string;
    };
}>();

const deadFighters = computed(() => props.cardsFighters.filter(fighter => !fighter.isAlive));
</script>

<template>
    <div
        class="graveyard"
        :style="cardSize"
    />
</template>

<style lang="scss" scoped>
.graveyard {
    background-color: var(--background-on-page-color);

    border: 1px solid var(--background-on-page-color);

    &:hover {
        cursor: pointer;

        filter: brightness(1.1);
    }
}</style>
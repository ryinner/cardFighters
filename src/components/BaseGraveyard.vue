<script lang="ts" setup>
import { computed, ref } from 'vue';
import { CardsFighters } from '../types/cardsFighters.types';
import BaseModal from './BaseModal.vue';
import CardFighter from './CardFighter.vue';

const props = defineProps<{
    isPlayer: boolean;
    cardsFighters: CardsFighters[];
    cardSize: {
        width: string;
        height: string;
    };
}>();

const isOpen = ref(false);

const graveyardType = computed(() => props.isPlayer ? 'Player' : 'Enemy');

const deadFighters = computed(() => props.cardsFighters.filter(fighter => !fighter.isAlive));
</script>

<template>
    <div
        class="graveyard"
        :style="cardSize"
        @click="isOpen = true"
    >
        <BaseModal
            :is-open="isOpen"
            @close="isOpen = false"
            @open="isOpen = true"
        >
            <template #header>
                {{ graveyardType }} graveyard
            </template>
            <template #body>
                <div class="graveyard__fighters">
                    <CardFighter 
                        v-for="fighter in deadFighters"
                        :key="fighter.name"
                        class="graveyard__card"
                        :fighter="fighter"
                        :is-player="isPlayer"
                    />
                </div>
            </template>
        </BaseModal>
    </div>
</template>

<style lang="scss" scoped>
.graveyard {
    background-color: var(--background-on-page-color);

    border: 1px solid var(--background-on-page-color);

    &:hover {
        cursor: pointer;

        filter: brightness(1.1);
    }

    &__fighters {
        display: grid;

        grid-template-columns: repeat(12, 1fr);
    }

    &__card {
        grid-column: 3 span;
    }
}</style>
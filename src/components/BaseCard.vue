<script lang="ts" setup>
import { computed } from 'vue';
import { useUserStore } from '../state/user.state';
import { Card } from '../types/cards.type';

const props = defineProps<{
    card: Card;
}>();

const { haveCard } = useUserStore();

const isSelected = computed(() => haveCard(props.card));
</script>

<template>
    <div 
        class="card"
        :class="{'card--active': isSelected}"
    >
        <div class="card__portrait">
            <img
                :src="card.image"
                :alt="card.name"
                class="card__image"
            />
        </div>
        <div class="card__text">
            <div class="card__name">
                {{ card.name }}
            </div>
            <div class="card__type">
                {{ card.type }}
            </div>
            <div class="card__description">
                {{ card.description }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../style/mixins/media';

.card {
    padding: 2rem 1rem;

    display: grid;
    gap: var(--default-gap);
    grid-template-rows: repeat(12, 1fr);

    border: 1px solid;
    border-color: var(--inactive-color);

    &--active {
        border-color: var(--primary-color);
    }

    &__portrait {
        display: flex;
        grid-row: 8 span;

        @include for-tablet {
            grid-row: 6 span;
        }
    }

    &__image {
        object-fit: contain;
        width: 100%;

        border: 1px solid var(--primary-color);
    }

    &__text {
        grid-row: 4 span;

        @include for-tablet {
            grid-row: 6 span;
        }
    }

    &__name {
        font-size: 2rem;
    }

    &__type {
        margin-top: 0.5rem;
        color: var(--primary-color);
    } 

    &__description {
        margin-top: 0.5rem;
    }
}
</style>
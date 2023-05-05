<script lang="ts" setup>
import { CardsFighters } from '../types/cardsFighters.types';

defineProps<{
    fighter: CardsFighters;
    isPlayer: boolean;
    isSelected?: boolean;
}>();

</script>

<template>
    <div
        class="card-fighter"
        :class="{'card-fighter--player': isPlayer, 'card-fighter--enemy': !isPlayer, 'card-fighter--selected': isSelected}"
    >
        <div class="card-fighter__stats">
            <div 
                class="card-fighter__hp"
                title="hp"
            >
                {{ fighter.hp }}
            </div>
        </div>
        <div class="card-fighter__portrait">
            <img
                :src="fighter.image"
                :alt="fighter.name"
                class="card-fighter__image"
            />
        </div>
        <div class="card-fighter__text">
            {{ fighter.name }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../style/mixins/media';

.card-fighter {
    z-index: 1;
    display: flex;
    padding: 20px;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid;

    &--player {
        border-color: var(--success-color);
    }

    &--enemy {
        border-color: var(--error-color);
    }

    &--enemy &__image {
        transform: scale(-1, 1);
    }

    &--enemy &__hp {
        left: 0;
        right: unset;
        border-radius: 0 0 4px 0;
    }

    &--selected {
        border-color: var(--info-color);
    }

    &__portrait {
        display: flex;
    }

    &__image {
        width: 100%;
        object-fit: contain;
    }

    &__text {
        align-self: center;
    }

    &__stats {
        top: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 100%;
        position: absolute;
    }

    &__hp {
        top: 0;
        right: 0;
        padding: 6px;
        position: absolute;
        border-radius: 0 0 0 4px;
        background-color: var(--success-color);

        @include for-phone-only {
            padding: 3px;
            font-size: 0.8rem;
        }
    }
}
</style>
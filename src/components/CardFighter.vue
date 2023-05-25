<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { CardsFightersEvents } from '../types/cardFightersEvents.types';
import { CardsFighters } from '../types/cardsFighters.types';

const props = defineProps<{
    fighter: CardsFighters;
    isPlayer: boolean;
    isSelected?: boolean;
}>();

const stateManager: Ref<CardsFightersEvents | false> = ref(false);

props.fighter.addHandler(CardsFightersEvents.takeDamage, () => {
    stateManager.value = CardsFightersEvents.takeDamage;

    resetStateManager();
});

const resetStateManager = () => {
    setTimeout(() => { stateManager.value = false; }, 1000);
};
</script>

<template>
    <Transition name="card-fighter-dying">
        <div
            v-if="fighter.isAlive"
            ref="cardFighterElement"
            class="card-fighter"
            :class="{
                'card-fighter--player': isPlayer,
                'card-fighter--enemy': !isPlayer,
                'card-fighter--selected': isSelected,
                'card-fighter--damaged': stateManager === CardsFightersEvents.takeDamage
            }"
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
            <div class="card-fighter__actions">
                <template
                    v-for="(actionType, type) in fighter.actions"
                    :key="type"
                >
                    <img
                        v-for="action in actionType.actions"
                        :key="action.name"
                        :src="actionType.image"
                        :alt="action.name"
                        :class="{ 'card-fighter__action-icon--activated': action.isActivated }"
                        class="card-fighter__action-icon"
                    />
                </template>
            </div>
        </div>
    </Transition>
</template>

<style lang="scss" scoped>
@import '../style/mixins/media';

.card-fighter {
    z-index: 1;
    position: relative;

    padding: 20px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    border: 1px solid;

    background-color: var(--page-color);

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
        height: 100%;
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

    &__actions {
        gap: 6px;
        display: grid;
        margin-top: 1rem;
        justify-content: center;
        grid-template-columns: repeat(12, 1fr);
    }

    &__action-icon {
        width: 100%;
        object-fit: contain;
        grid-column: 2 span;

        &--activated {
            filter: grayscale(100%);
        }
    }

    &-dying {
        &-leave-active {
            animation: damaged 1s;
        }
    }

    &--damaged {
        animation: damaged 1s ease-out;
    }
}

@keyframes damaged {
    0% {
        transform: rotate(-15deg);
    }

    50% {
        transform: rotate(15deg);
    }

    100% {
        transform: translateX(0);
    }
}
</style>
<script lang="ts" setup>
import { useFightStore } from '../state/fight.state';
import BaseLink from './BaseLink.vue';
import BaseModal from './BaseModal.vue';

defineProps<{
    isWin: boolean;
    gameEnd: boolean;
}>();

const fightStore = useFightStore();

</script>

<template>
    <BaseModal :is-open="gameEnd">
        <template #header>
            <template v-if="isWin">
                Hey, you've won!
            </template>
            <template v-else>
                You've lost, but you can try again!
            </template>
        </template>
        <template #body>
            <div class="end-game__body">
                <div class="end-game__stats">
                    The game ended in {{ fightStore.tour.number }} rounds.
                </div>
                <BaseLink 
                    class="end-game__link"
                    :to="{ name: 'choose-cards' }"
                >
                    Let's rock.
                </BaseLink>
            </div>
        </template>
    </BaseModal>
</template>

<style lang="scss" scoped>
.end-game {
    &__body {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }

    &__stats {
        font-size: 1.5rem;
        margin-top: 1.3rem;
        margin-bottom: 1.8rem;
    }
}
</style>
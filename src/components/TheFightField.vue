<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import cardsFactoryFunctional from '../functional/cardsFactory.functional';
import { useUserStore } from '../state/user.state';
import { CardsFighters } from '../types/cardsFighters.types';

const userStore = useUserStore();

const cardFightersPlayer = ref<CardsFighters[]>([]);

const printCards = () => {
    userStore.cardsRaw.forEach(cardRaw => {
        cardFightersPlayer.value.push(cardsFactoryFunctional(cardRaw));
    });
};

onMounted(printCards);
</script>

<template>
    <div class="fight-field">
        <div class="graveyard"></div>
        <div class="player-field"></div>
        <div class="enemy-field"></div>
    </div>
</template>

<style lang="scss" scoped>
.fight-field {
    
}
</style>
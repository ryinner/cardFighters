<script lang="ts" setup>
import { CardsFighters } from '../types/cardsFighters.types';

const props = defineProps<{
    fighter: CardsFighters;
}>();

</script>

<template>
    <div class="card-fighter">
        {{ fighter }}
    </div>
</template>

<style lang="scss" scoped>
.card-fighter {
    border: 1px solid var(--primary-color);
}
</style>
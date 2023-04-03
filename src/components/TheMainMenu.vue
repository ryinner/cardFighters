<script lang="ts" setup>
import BaseLink from './BaseLink.vue';
</script>

<template>
    <div class="main-menu">
        <h1 class="main-menu__heading">
            Card Fighters
        </h1>
        <BaseLink
            :to="{
                name: 'choose-cards'
            }"
            class="main-menu__link"
        >
            Start
        </BaseLink>
    </div>
</template>

<style lang="scss" scoped>
</style>
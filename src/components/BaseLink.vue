<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router';

defineProps<{
    to: RouteLocationRaw;
}>();

</script>

<template>
    <RouterLink
        class="link"
        :to="to"
    >
        <slot />
    </RouterLink>
</template>

<style lang="scss">
.link {
    transition: 300ms ease;

    color: var(--primary-color);
    font-size: 1.5rem;
    text-decoration: none;

    border: 1px solid var(--primary-color);

    padding: 0.5rem 2rem;
}
</style>
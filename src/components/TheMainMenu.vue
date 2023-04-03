<template>
    <div class="main-menu">
        <h1 class="main-menu__heading">
            Card Fighters
        </h1>
        <RouterLink
            :to="{
                name: 'choose-cards'
            }"
            class="main-menu__link"
        >
            Start
        </RouterLink>
    </div>
</template>

<style lang="scss" scoped>
.main-menu {
    &__link {
        color: var(--primary-color);
        font-size: 1.5rem;
        padding: 0.5rem 2rem;
        text-decoration: none;
    }
}</style>
<script lang="ts" setup>
defineProps<{
    items: { name: string }[];
}>();
</script>

<template>
    <Teleport to="body">
        <Transition name="context-menu">
            <div class="context-menu">
                <TransitionGroup
                    name="context-menu__item"
                    tag="ul"
                    class="context-menu__list"
                >
                    <li
                        v-for="item in items"
                        :key="item.name"
                        class="context-menu__item"
                    >
                        <slot :item="item" />
                    </li>
                </TransitionGroup>
            </div>
        </Transition>
    </Teleport>
</template>

<style lang="scss" scoped>
.context-menu {

    &-enter-active,
    &-leave-active {
        transition: opacity 0.5s ease;
    }

    &-enter-from,
    &-leave-to {
        opacity: 0;
    }

    &__item {

        &-enter-active,
        &-leave-active {
            transition: all 0.5s ease;
        }

        &-enter-from,
        &-leave-to {
            opacity: 0;
            transform: translateX(30px);
        }
    }
}
</style>
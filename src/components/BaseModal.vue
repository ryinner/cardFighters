<script lang="ts" setup>
defineProps<{
    isOpen: boolean;
}>();

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
    (e: 'open'): void;
    (e: 'close'): void;
}>();
</script>

<template>
    <Teleport to="body">
        <div 
            v-if="isOpen"
            class="modal"
        >
            <div
                class="modal__background"
                @click="emit('close')"
            />
            <div class="modal__content">
                <div class="modal__header">
                    <slot name="header" />
                </div>
                <div class="modal__body">
                    <slot name="body" />
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style lang="scss" scoped>
.modal {
    &__content {
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 5;

        min-width: 20%;
        min-height: 20%;

        padding: 2rem;

        color: var(--ink-color);
        background-color: var(--page-color);

        transform: translate(-50%, -50%);
    }

    &__header {
        font-size: 1.6rem;

        padding-bottom: 0.5rem;

        border-bottom: 1px solid var(--ink-color);
    }

    &__boyd {
        padding: 1rem 0;
    }

    &__background {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 4;

        width: 100%;
        height: 100%;

        opacity: 0.8;
        background-color: var(--background-on-page-color);
    }
}</style>
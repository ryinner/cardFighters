<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useFightStore } from '../state/fight.state';

const { tour } = storeToRefs(useFightStore());
</script>

<template>
    <Teleport to="body">
        <div class="tour-information">
            <div class="tour-information__number">
                Round: {{ tour.number }}
            </div>
            <div class="tour-information__timer">
                Time left: {{ tour.minutes }}:{{ tour.seconds }}
            </div>
        </div>
    </Teleport>
</template>

<style lang="scss" scoped>
@import '../style/mixins/media';

.tour-information {
    position: fixed;
    top: 10%;
    left: 50%;
    z-index: 4;
    transform: translate(-50%, 50%);

    text-align: center;

    @include for-phone-landscape {
        top: -0.5rem;
    }

    &__number {
        font-size: 1.8rem;

        @include for-phone-landscape {
            font-size: 1.3rem;
        }
    }
}
</style>
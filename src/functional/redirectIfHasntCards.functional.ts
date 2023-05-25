import { NavigationGuard } from 'vue-router';
import { useUserStore } from '../state/user.state';

export default <NavigationGuard> function () {
    return useUserStore().isMaxCardsInDeck ? true : { name: 'choose-cards' };
};

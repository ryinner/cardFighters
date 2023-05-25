import { CardsFightersEvents, type CardsFightersEventsHandlers } from '../types/cardFightersEvents.types';

export default function (): CardsFightersEventsHandlers {
    const eventsHandlers: Partial<CardsFightersEventsHandlers> = {};
    Object.values(CardsFightersEvents).forEach(event => {
        eventsHandlers[event] = [];
    });

    if (isValidEventsHandlersPredicate(eventsHandlers)) {
        return eventsHandlers;
    } else {
        throw new Error('Invalid eventsHandlers');
    }

    function isValidEventsHandlersPredicate (eventsHandlers: Partial<CardsFightersEventsHandlers>): eventsHandlers is CardsFightersEventsHandlers {
        return Object.keys(eventsHandlers).length === Object.keys(CardsFightersEvents).length;
    }
}
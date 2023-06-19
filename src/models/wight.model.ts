import actionsFactoryFunctional from '../functional/actionsFactory.functional';
import formCardsEventHandlersObjectFunctional from '../functional/formCardsEventHandlersObject.functional';
import { ActionsTypes } from '../types/actions.type';
import type { FormedActions } from '../types/actionsFormed.type';
import { CardsFightersEvents, type CardsFighterEventHandler, type CardsFightersEventsHandlers } from '../types/cardFightersEvents.types';
import type { Card } from '../types/cards.type';

export default abstract class <ActionsType extends ActionsTypes> {
    public readonly name: string;
    public readonly image: string;
    public readonly actions: FormedActions<ActionsType>;

    public readonly maxHealPoints: number;
    private healPoints: number;

    private eventsHandlers!: CardsFightersEventsHandlers;

    public get hp (): number {
        return this.healPoints;
    }

    public set hp (value) {
        if (value <= 0) {
            this.die();
        } else {
            this.healPoints = value > this.maxHealPoints ? this.maxHealPoints : value;
            this.fireEvent(CardsFightersEvents.heal, value);
        }
    }

    public get isAlive (): boolean {
        return this.hp > 0;
    }

    constructor (cardRaw: Card) {
        this.healPoints = cardRaw.healthPoints;
        this.maxHealPoints = cardRaw.healthPoints;
        this.name = cardRaw.name;
        this.image = cardRaw.image;
        this.actions = actionsFactoryFunctional(cardRaw.actions);

        this.eventsHandlers = formCardsEventHandlersObjectFunctional();
    }

    public takeDamage(damage: number): void {
        this.hp -= damage;
        this.fireEvent(CardsFightersEvents.takeDamage, damage);
    }

    public takeHeal (heal: number): void {
        if (this.isAlive) {
            this.hp += heal;
            this.fireEvent(CardsFightersEvents.heal, heal);
        }
    }

    public addHandler(event: CardsFightersEvents, handler: CardsFighterEventHandler): void {
        this.eventsHandlers[event].push(handler);
    }

    public clearHandlers(): void {
        (<CardsFightersEvents[]> Object.keys(this.eventsHandlers)).forEach((events) => {
            this.eventsHandlers[events] = [];
        });
    }

    private fireEvent(event: CardsFightersEvents, value?: boolean | number): void {
        this.eventsHandlers[event].forEach(handler => {
            handler(value);
        });
    }

    private die(): void {
        this.healPoints = 0;
        this.fireEvent(CardsFightersEvents.die);
    }
}

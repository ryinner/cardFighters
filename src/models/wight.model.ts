import actionsFactoryFunctional from '../functional/actionsFactory.functional';
import { ActionsTypes } from '../types/actions.type';
import type { FormedActions } from '../types/actionsFormed.type';
import type { Card } from '../types/cards.type';

export default abstract class <ActionsType extends ActionsTypes> {
    public readonly name: string;
    public readonly image: string;
    public readonly actions: FormedActions<ActionsType>;

    public isAlive = true;

    private readonly maxHealPoints: number;
    private healPoints: number;

    public get hp (): number {
        return this.healPoints;
    }

    public set hp (value) {
        if (value <= 0) {
            this.die();
        } else {
            this.healPoints = value > this.maxHealPoints ? this.maxHealPoints : value;
        }
    }

    constructor (cardRaw: Card) {
        this.healPoints = cardRaw.healthPoints;
        this.maxHealPoints = cardRaw.healthPoints;
        this.name = cardRaw.name;
        this.image = cardRaw.image;
        this.actions = actionsFactoryFunctional(cardRaw.actions);
    }

    public takeDamage(damage: number): void {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.die();
        }
    }

    public takeHeal (heal: number) {
        if (this.isAlive) {
            this.hp += heal;
        }
    }

    private die(): void {
        this.isAlive = false;
        this.hp = 0;
    }
}

import type { Card } from '../types/cards.type';

export default class {
    public isAlive = true;

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

    private readonly maxHealPoints: number;
    private healPoints: number;

    constructor (cardRaw: Card) {
        this.healPoints = cardRaw.healthPoints;
        this.maxHealPoints = cardRaw.healthPoints;
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
};

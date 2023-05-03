import * as CardTypes from '../types/cards.type';

export default function (cardRaw: CardTypes.Card) {
    switch (cardRaw.type) {
        case 'warrior':
            return new Warrior(cardRaw);
        case 'healer':
            return new Healer(cardRaw);
    }
}

class Wight {
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

    constructor (cardRaw: CardTypes.Card) {
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
}

class Warrior extends Wight {
    private damage: number;

    constructor (cardRaw: CardTypes.Warrior) {
        super(cardRaw);
        this.damage = cardRaw.damage;
    }

    public attack (target: Wight) {
        target.takeDamage(this.damage);
    }
}

class Healer extends Wight {
    private healingPower: number;

    constructor (cardRaw: CardTypes.Healer) {
        super(cardRaw);

        this.healingPower = cardRaw.healthPoints;
    }

    public heal (target: Wight) {
        target.takeHeal(this.healingPower);
    }
}

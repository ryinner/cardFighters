import type { CardsFighters } from '../types/cardsFighters.types';

export default abstract class {
    public name: string;
    public image: string;
    protected power: number;
    private haveBeenActivated: boolean;

    public get activated () {
        return this.haveBeenActivated;
    }

    constructor (name: string, power: number, image: string) {
        this.name = name;
        this.power = power;
        this.image = image;
        this.haveBeenActivated = false;
    }

    activate(target: CardsFighters): void {
        if (!this.haveBeenActivated && this.tryAction(target)) {
            this.haveBeenActivated = true;
        }
    }

    reactivate(): void {
        this.haveBeenActivated = false;
    }

    abstract tryAction(target: CardsFighters): boolean;
}
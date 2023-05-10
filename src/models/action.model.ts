import type { CardsFighters } from '../types/cardsFighters.types';

export default abstract class {
    public name: string;
    public abstract image: string;
    protected power: number;
    private haveBeenActivated: boolean;

    constructor (name: string, power: number) {
        this.name = name;
        this.power = power;
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
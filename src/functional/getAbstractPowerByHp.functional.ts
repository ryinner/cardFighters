export default function (currentHealPoints: number, maxHealPoints: number): number {
    const differenceWeight = (maxHealPoints - currentHealPoints) * 2;
    const maxHealPointsWeight = maxHealPoints / 4;

    return differenceWeight + maxHealPointsWeight;
}   

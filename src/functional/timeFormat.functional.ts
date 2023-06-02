export default function (time: number): string {
    const truncTime = Math.trunc(time);

    return truncTime < 10 ? `0${truncTime}`: truncTime.toString();
}
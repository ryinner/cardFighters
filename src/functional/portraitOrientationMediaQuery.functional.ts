export default function (): boolean {
    return window.matchMedia('(orientation: portrait) and (max-width: 599px)').matches;
}

type FngStatus =
    | 'extreme-fear'
    | 'fear'
    | 'neutral'
    | 'greed'
    | 'extreme-greed'

export function getFngStatus(
    fngIndex: number,
): FngStatus | undefined {
    if (fngIndex <= 20) return 'extreme-fear';
    if (fngIndex <= 40) return 'fear'
    if (fngIndex <= 60) return 'neutral';
    if (fngIndex <= 80) return 'greed';
    if (fngIndex <= 100) return 'extreme-greed';
};

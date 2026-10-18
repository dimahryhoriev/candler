type RoundDirection = 'floor' | 'round' | 'ceil';

export function roundToStep(
    value: number,
    step: number,
    direction: RoundDirection = 'round',
): number {
    const ratio = value / step;

    switch (direction) {
        case 'floor': return Math.floor(ratio) * step;
        case 'round': return Math.round(ratio) * step;
        case 'ceil': return Math.ceil(ratio) * step;
        default: return Math.round(ratio) * step;
    };
};

export type Change = {
    openTime: number;
    closeTime: number;
    change: number;
};

export type ChangeBounds = {
    time: { min: number, max: number };
    change: { min: number, max: number };
    size: { width: number, height: number };
};

export function calculateChangePercent({
    openValue,
    closeValue,
}: {
    openValue: number,
    closeValue: number,
}) {
    return (
        openValue > 0
            ? ((closeValue - openValue) / openValue) * 100
            : 0
    );
};

export function calculateChangeSteps({
    limit,
    stepMultiple = 5,
    minChange,
    maxChange,
}: {
    limit: number;
    stepMultiple?: number;
    minChange: number;
    maxChange: number;
}) {
    const step = (maxChange - minChange) / (limit);

    const negativeSteps = minChange < 0
        ? (
            Array.from(
                {
                    length: Math.abs(minChange / step),
                },
                (_, index) => {
                    return -(index + 1) * step;
                },
            )
        ).reverse()
        : [];

    const positiveSteps = maxChange > 0
        ? (
            Array.from(
                {
                    length: Math.abs(maxChange / step),
                },
                (_, index) => {
                    return step + (index * step);
                },
            )
        )
        : [];

    return (
        [...negativeSteps, 0, ...positiveSteps].map(
            step => (
                Math.round(step / stepMultiple)
                *
                stepMultiple
            )
        )
    );
};

export function scaleChangeToPoint({
    changeBounds,
    currChange,
    currTime,
}: {
    changeBounds: ChangeBounds;
    currChange: number;
    currTime: number;
}) {
    const { time, change, size } = changeBounds;
    const timeRange = time.max - time.min || 1;
    const changeRange = change.max - change.min || 1;

    const yRatio = ((currChange - change.min) / changeRange);
    const xRatio = ((currTime - time.min) / timeRange);

    return {
        x: xRatio * size.width,
        y: size.height - (yRatio * size.height),
    };
};

export function getChangeLimits(
    changes: Change[],
) {
    let minTime = Infinity;
    let maxTime = -Infinity;
    let minChange = Infinity;
    let maxChange = -Infinity;

    for (const c of changes) {
        if (c.openTime < minTime) minTime = c.openTime;
        if (c.closeTime > maxTime) maxTime = c.closeTime;
        if (c.change < minChange) minChange = c.change;
        if (c.change > maxChange) maxChange = c.change;
    };

    return {
        minTime,
        maxTime,
        minChange,
        maxChange,
    };
};

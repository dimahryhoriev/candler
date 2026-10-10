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

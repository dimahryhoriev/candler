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
    minChange,
    maxChange,
}: {
    limit: number;
    minChange: number;
    maxChange: number;
}) {
    const step = (maxChange - minChange) / limit;
    return Array.from(
        {
            length: limit + 1,
        },
        (_, index) => {
            return (
                minChange + (index * step)
            );
        },
    );
};

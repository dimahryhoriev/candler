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

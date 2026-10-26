import { CanvasRect } from "@/hooks/use-canvas-rect";

export type Change = {
    openTime: number;
    closeTime: number;
    change: number;
};

export type ChangeLimits = {
    minTime: number;
    maxTime: number;
    minChange: number;
    maxChange: number;
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
    minChange,
    maxChange,
}: {
    limit: number;
    minChange: number;
    maxChange: number;
}) {
    if (limit <= 0) return [];
    if (limit === 1) return [0];

    const step = (maxChange - minChange) / (limit - 1);

    return Array.from(
        { length: limit },
        (_, i) => {
            return maxChange - (i * step);
        },
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
): ChangeLimits {
    let minTime = Infinity;
    let maxTime = -Infinity;
    let minChange = Infinity;
    let maxChange = -Infinity;

    for (const c of changes) {
        if (c.closeTime < minTime) minTime = c.closeTime;
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

export function getChangeBounds(
    changes: Change[],
    canvasRect?: CanvasRect,
) {
    const {
        minTime,
        maxTime,
        minChange,
        maxChange,
    } = getChangeLimits(changes);

    return {
        time: { min: minTime, max: maxTime },
        change: { min: minChange, max: maxChange },
        size: { width: canvasRect?.width ?? 0, height: canvasRect?.height ?? 0 },
    }
}

import { Point } from "../math/point";

export function findClosestTimeStepIndex(
    points: Point[],
    cursorX: number,
): number {
    let closestIndex = 0;
    let minDiff = Infinity;

    for (let i = 0; i < points.length; i++) {
        const diff = Math.abs(
            points[i].x - cursorX
        );

        if (diff < minDiff) {
            minDiff = diff;
            closestIndex = i;
        } else {
            break;
        };
    };

    return closestIndex;
};

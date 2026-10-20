import { AssetPoints } from "../assets/assets-calculations";
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

export function snapChartCrosshair(
    assetsPoints: AssetPoints[],
    crosshairPoint: Point,
) {
    const basePoints = assetsPoints[0]?.points;
    const closestIndex = findClosestTimeStepIndex(
        basePoints,
        crosshairPoint.x,
    );

    return {
        positionX: basePoints[closestIndex]?.x ?? crosshairPoint.x,
        anchors: assetsPoints.map(
            (a) => ({
                symbol: a.symbol,
                positionY: a.points[closestIndex].y,
            })
        ),
    };
}

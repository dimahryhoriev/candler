import { AssetPoint, AssetPoints } from "../assets/assets-calculations";
import { findClosestPoint, Point } from "../math/point";

export type ChartAnchor = {
    symbol: string;
    point: AssetPoint;
};

export type Crosshair = {
    positionX: number;
    timeMs: number;
    anchors: ChartAnchor[];
};

export function snapChartCrosshair(
    assetsPoints: AssetPoints[],
    crosshairPoint: Point,
): Crosshair {
    const oldestAsset = assetsPoints.reduce(
        (acc, curr) => {
            const oldestTime = acc?.points[0]?.changeValues.openTime ?? Infinity;
            const currTime = curr?.points[0]?.changeValues.openTime ?? Infinity;
            return currTime < oldestTime ? curr : acc;
        },
        assetsPoints[0]
    );

    const basePoints = oldestAsset?.points ?? [];
    const basePoint = findClosestPoint({
        points: basePoints.map(p => p.position),
        targetPoint: crosshairPoint,
        findBy: 'x',
    });

    const positionX = basePoint?.x ?? crosshairPoint.x;

    return {
        positionX,
        timeMs:
            oldestAsset?.points.find(
                p => p.position.x === positionX
            )?.changeValues.closeTime
            ??
            0,
        anchors:
            assetsPoints.map(
                (a) => {
                    const points = a.points.map(p => p.position);
                    const closestPoint = findClosestPoint({
                        points,
                        targetPoint: { x: positionX, y: crosshairPoint.y },
                        findBy: 'x',
                    });

                    if (!closestPoint) return null;

                    return {
                        symbol: a.symbol,
                        point: {
                            position: closestPoint,
                            changeValues: a.points.find(
                                p => p.position.x === closestPoint.x
                            )?.changeValues
                        },
                    }
                }
            )
                .filter(
                    (anchor): anchor is ChartAnchor => (
                        anchor !== null
                    )
                )
    };
}

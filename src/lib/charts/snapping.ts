import { AssetPoints } from "../assets/assets-calculations";
import { findClosestPoint, Point } from "../math/point";

export type ChartAnchor = {
    symbol: string;
    positionY: number;
}

export function snapChartCrosshair(
    assetsPoints: AssetPoints[],
    crosshairPoint: Point,
) {
    const basePoints = assetsPoints[0]?.points;
    const basePoint = findClosestPoint({
        points: basePoints,
        targetPoint: crosshairPoint,
        findBy: 'x',
    });

    const positionX = basePoint?.x ?? crosshairPoint.x;

    return {
        positionX: basePoint?.x ?? crosshairPoint.x,
        anchors: assetsPoints
            .map(
                (a) => {
                    const point = findClosestPoint({
                        points: a.points,
                        targetPoint: { x: positionX, y: crosshairPoint.y },
                        findBy: 'x',
                    });

                    if (!point) return null;

                    return {
                        symbol: a.symbol,
                        positionY: point.y,
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

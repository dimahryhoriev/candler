import { AssetPoint, AssetPoints } from "../assets/assets-calculations";
import { findClosestPoint, Point } from "../math/point";

export type ChartAnchor = {
    symbol: string;
    point: AssetPoint;
};

export type Crosshair = {
    positionX: number;
    anchors: ChartAnchor[];
};

export function snapChartCrosshair(
    assetsPoints: AssetPoints[],
    crosshairPoint: Point,
): Crosshair {
    const basePoints = assetsPoints[0]?.points;
    const basePoint = findClosestPoint({
        points: basePoints.map(p => p.position),
        targetPoint: crosshairPoint,
        findBy: 'x',
    });

    const positionX = basePoint?.x ?? crosshairPoint.x;

    return {
        positionX: basePoint?.x ?? crosshairPoint.x,
        anchors: assetsPoints
            .map(
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
                                p => p.position === closestPoint
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

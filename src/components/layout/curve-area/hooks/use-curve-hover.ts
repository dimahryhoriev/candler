import { AssetPoints } from "@/lib/assets/assets-calculations";
import { findClosestPoint, findHypotenuse, Point } from "@/lib/math/point";
import { useMemo } from "react";

export function useCurveHover(
    assetsPoints: AssetPoints[],
    cursorPosition?: Point | null,
    maxDistance: number = 5,
) {
    const hoveredCurve = useMemo(() => {
        if (!cursorPosition || assetsPoints.length === 0) {
            return null;
        };

        let symbol: string | null = null;
        let minDistance = maxDistance;

        for (const asset of assetsPoints) {
            const closestPoint = findClosestPoint({
                points: asset.points.map(p => p.position),
                targetPoint: cursorPosition,
                findBy: 'xy',
                maxDistance,
            });

            if (!closestPoint) continue;
            const distance = findHypotenuse(closestPoint, cursorPosition);

            if (distance < minDistance) {
                minDistance = distance;
                symbol = asset.symbol;
            };

            return symbol;
        }
    }, [cursorPosition, assetsPoints, maxDistance]);

    return hoveredCurve;
}

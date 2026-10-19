import { CanvasRect } from "@/hooks/use-canvas-rect";
import { AssetPoints } from "../assets/assets-calculations";

export function buildAssetsCurves({
    assetsPoints,
    canvasRect,
}: {
    assetsPoints: AssetPoints[];
    canvasRect: CanvasRect;
}) {
    return (
        assetsPoints.map(
            (a) => {
                const points = a.points;
                const line = points.reduce(
                    (acc, point, index) => (
                        index === 0
                            ? `M ${point.x} ${point.y}`
                            : `${acc} L ${point.x} ${point.y}`
                    ),
                    ''
                );

                const fill = (
                    line
                    + `L ${canvasRect.width} ${canvasRect.height}`
                    + `L ${points[0].x} ${canvasRect.height}`
                    + `L ${points[0].x} ${points[0].y}`
                )

                return {
                    symbol: a.symbol,
                    line,
                    fill,
                };
            }
        )
    );
}

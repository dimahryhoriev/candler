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
                            ? `M ${point.position.x} ${point.position.y}`
                            : `${acc} L ${point.position.x} ${point.position.y}`
                    ),
                    ''
                );

                const fill = (
                    line
                    + `L ${canvasRect.width} ${canvasRect.height}`
                    + `L ${points[0].position.x} ${canvasRect.height}`
                    + `L ${points[0].position.x} ${points[0].position.y}`
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

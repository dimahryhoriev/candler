import { CanvasRect } from "@/hooks/use-canvas-rect";
import { AssetChanges } from "../assets/assets-calculations";
import { ChangeBounds, scaleChangeToPoint } from "../math/change";

export function buildAssetsCurves({
    assetsChanges,
    changeBounds,
    canvasRect,
}: {
    assetsChanges: AssetChanges[];
    changeBounds: ChangeBounds;
    canvasRect: CanvasRect;
}) {
    return (
        assetsChanges
            .sort((a, b) => {
                const maxA = Math.max(...a.changes.map(c => c.change));
                const maxB = Math.max(...b.changes.map(c => c.change));
                return maxB - maxA;
            })
            .map((asset) => {
                const points = (
                    asset.changes.map((c, index) => (
                        scaleChangeToPoint({
                            changeBounds,
                            currChange: c.change,
                            currTime: index === 0
                                ? c.openTime
                                : c.closeTime,
                        })
                    ))
                );

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
                    symbol: asset.symbol,
                    line,
                    fill,
                };
            })
    );
}

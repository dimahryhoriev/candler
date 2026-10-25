import { useCanvasRect } from "@/hooks/use-canvas-rect";
import { AssetKlines } from "@/lib/api/fetch-klines";
import { calculateAssetsChanges, scaleAssetsChangesToPoints } from "@/lib/assets/assets-calculations";
import { ColorsMap } from "@/lib/charts/colors";
import { buildAssetsCurves } from "@/lib/charts/curves";
import { snapChartCrosshair } from "@/lib/charts/snapping";
import { TimeframeKey } from "@/lib/charts/timeframes";
import { calculateChangeSteps, getChangeBounds } from "@/lib/math/change";
import { ChangeStepsList } from "../change-steps-list";
import { CurveArea } from "../curve-area/curve-area";
import { TimeframeTicks } from "../timeframe-ticks";
import { useChartCrosshair } from "./hooks/use-chart-crosshair";
import { PerformanceChartGuideline, PerformanceChartTooltip } from "./performance-chart-crosshair";
import { PerformanceChartStartline } from "./performance-chart-startline";

export function PerformanceChartViewport({
    assetsKlines,
    colorsMap,
    timeframeKey,
    isLoading,
}: {
    assetsKlines: AssetKlines[];
    colorsMap: ColorsMap;
    timeframeKey: TimeframeKey;
    isLoading: boolean;
}) {
    const { canvasRef, canvasRect } = useCanvasRect();

    const hasData = !isLoading && Boolean(assetsKlines?.length);

    const {
        point: crosshairPoint,
        onPointerMove,
        onPointerLeave,
    } = useChartCrosshair(canvasRect);

    const assetsChanges = calculateAssetsChanges(assetsKlines);
    const changesValues = assetsChanges.flatMap(a => a.changes);
    const changeBounds = getChangeBounds(changesValues, canvasRect);

    const assetsPoints = scaleAssetsChangesToPoints(
        assetsChanges,
        changeBounds,
    );

    const basePoints = assetsPoints[0]?.points;
    const snappedCrosshair = crosshairPoint && basePoints?.length
        ? snapChartCrosshair(assetsPoints, crosshairPoint)
        : null

    const curves = (canvasRect && changesValues.length)
        ? buildAssetsCurves({
            assetsPoints,
            canvasRect,
        })
        : []

    const changeSteps = calculateChangeSteps({
        limit: 8,
        minChange: changeBounds.change.min,
        maxChange: changeBounds.change.max,
    });

    return (
        <div
            className="
                flex flex-col gap-3 relative
            "
        >
            <div
                className="
                flex w-full h-auto gap-3
            "
            >
                <svg
                    className="w-full h-full"
                    ref={ canvasRef }
                    onPointerMove={ onPointerMove }
                    onPointerLeave={ onPointerLeave }
                >
                    {
                        hasData
                            ? (
                                <CurveArea
                                    curves={ curves }
                                    colorsMap={ colorsMap }
                                    cursorPosition={ crosshairPoint }
                                    assetsPoints={ assetsPoints }
                                />
                            )
                            : (
                                <PerformanceChartStartline
                                    canvasRect={ canvasRect }
                                />
                            )
                    }
                    {
                        snappedCrosshair && canvasRect
                            ? (
                                <PerformanceChartGuideline
                                    linePositionX={ snappedCrosshair?.positionX }
                                    canvasHeight={ canvasRect.height }
                                    colorsMap={ colorsMap }
                                    anchors={ snappedCrosshair?.anchors }
                                />
                            )
                            : null
                    }
                </svg>
                {
                    <ChangeStepsList
                        changeSteps={ changeSteps }
                        isLoading={ !hasData }
                    />
                }
            </div>
            <TimeframeTicks
                assetsKlines={ assetsKlines }
                timeframeKey={ timeframeKey }
                canvasRect={ canvasRect }
                isLoading={ !hasData }
            />
            {
                snappedCrosshair && crosshairPoint
                    ? (
                        <PerformanceChartTooltip
                            anchors={ snappedCrosshair?.anchors }
                            colorsMap={ colorsMap }
                            crosshairPosition={
                                {
                                    x: snappedCrosshair?.positionX,
                                    y: crosshairPoint?.y,
                                }
                            }
                        />
                    )
                    : null
            }
        </div>
    )
};

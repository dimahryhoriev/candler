import { useCanvasRect } from "@/hooks/use-canvas-rect";
import { AssetKlines } from "@/lib/api/fetch-klines";
import { calculateAssetsChanges } from "@/lib/assets/assets-calculations";
import { buildAssetsCurves } from "@/lib/charts/curves";
import { getTimeframeTicks, getTimeframeTicksCount, TimeframeKey } from "@/lib/charts/timeframes";
import { formatChange, formatNumber } from "@/lib/format";
import { calculateChangeSteps, getChangeLimits } from "@/lib/math/change";

export function PerformanceChartViewport({
    assetKlines,
    colorsMap,
    timeframeKey,
    isLoading,
}: {
    assetKlines: AssetKlines[];
    colorsMap: Map<string, string>;
    timeframeKey: TimeframeKey;
    isLoading: boolean;
}) {
    const { canvasRef, canvasRect } = useCanvasRect();

    const firstKlines = assetKlines[0]?.klines;
    const hasData = !isLoading && Boolean(assetKlines?.length);

    const timeframeOpenTime = hasData
        ? firstKlines[0].openTime
        : 0

    const timeframeCloseTime = hasData
        ? firstKlines[firstKlines.length - 1].closeTime
        : 0

    const assetsChanges = calculateAssetsChanges(assetKlines);
    const changesValues = assetsChanges.flatMap(a => a.changes);

    const {
        minTime,
        maxTime,
        minChange,
        maxChange,
    } = getChangeLimits(changesValues);

    const changeBounds = {
        time: { min: minTime, max: maxTime },
        change: { min: minChange, max: maxChange },
        size: { width: canvasRect?.width ?? 0, height: canvasRect?.height ?? 0 },
    }

    const curves = (canvasRect && changesValues.length)
        ? buildAssetsCurves({
            assetsChanges,
            changeBounds,
            canvasRect,
        })
        : [];

    const timeframeTicks = hasData && canvasRect
        ? getTimeframeTicks({
            timeframeKey,
            timeRange: {
                openTime: timeframeOpenTime,
                closeTime: timeframeCloseTime,
            },
            count: getTimeframeTicksCount(
                canvasRect.width
            ),
        })
        : [];

    const changeSteps = calculateChangeSteps({
        limit: 8,
        minChange,
        maxChange,
    });

    return (
        <div
            className="
                flex flex-col gap-3
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
                >
                    {
                        hasData
                            ? (
                                curves.map((curve) => (
                                    [
                                        <path
                                            key={ `l-${curve.symbol}` }
                                            d={ curve.line }
                                            fill="none"
                                            stroke={ `var(${colorsMap.get(curve.symbol)})` }
                                            strokeWidth={ 3.5 }
                                        />,
                                        <path
                                            key={ `f-${curve.symbol}` }
                                            d={ curve.fill }
                                            fill={ `var(${colorsMap.get(curve.symbol)}-secondary)` }
                                        />
                                    ]
                                ))
                            )
                            : (
                                <path
                                    key="startline"
                                    d={
                                        canvasRect
                                            ? `M 0 ${canvasRect.height} L ${canvasRect.width} ${canvasRect.height}`
                                            : ``
                                    }
                                    fill="none"
                                    stroke={ `var(--muted)` }
                                    strokeWidth={ 3.5 }
                                />
                            )
                    }
                </svg>
                <div
                    className="
                    flex flex-col gap-8
                    h-full w-fit
                "
                >
                    {
                        hasData
                            ? (
                                changeSteps.map(
                                    (change, index) => (
                                        <span
                                            className="text-xs"
                                            key={ `${index}` }
                                        >
                                            {
                                                formatChange(change)
                                            }
                                        </span>
                                    )
                                )
                            )
                            : Array.from(
                                { length: 8 },
                                (_, index) => (
                                    <span
                                        className="text-xs"
                                        key={ `${index}` }
                                    >
                                        {
                                            formatChange(Number(formatNumber('0')))
                                        }
                                    </span>
                                )
                            )
                    }
                </div>
            </div>
            <div
                className="
                    flex justify-between items-center h-4
                    overflow-hidden
                "
                style={ {
                    width: canvasRect?.width ?? 0
                } }
            >
                {
                    hasData
                        ? (
                            timeframeTicks.map(
                                (tick, index) => (
                                    <span
                                        className="text-xs"
                                        key={ `${index}` }
                                    >
                                        {
                                            tick
                                        }
                                    </span>
                                )
                            )
                        )
                        : Array.from(
                            {
                                length: 3
                            },
                            (_, index) => (
                                <span
                                    className="text-xs"
                                    key={ `${index}` }
                                >
                                    --
                                </span>
                            )
                        )
                }
            </div>
        </div>
    )
};

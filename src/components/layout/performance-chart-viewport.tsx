import { useCanvasRect } from "@/hooks/use-canvas-rect";
import { AssetKlines } from "@/lib/fetch-klines";
import { formatChange, formatNumber } from "@/lib/format";
import { calculateChangeSteps, getChangeLimits, scaleChangeToPoint } from "@/lib/math/change";
import { TimeframeKey } from "./performance-chart";

export function PerformanceChartViewport({
    klines,
    colorsMap,
    isLoading,
}: {
    klines: AssetKlines[];
    colorsMap: Map<string, string>;
    isLoading: boolean;
}) {
    const { canvasRef, canvasRect } = useCanvasRect();

    const assetChanges = klines.map(
        (asset) => {
            const openPrice = asset.klines[0]?.openPrice;
            if (!openPrice) return {
                symbol: asset.symbol,
                changes: [],
            };

            return {
                symbol: asset.symbol,
                changes:
                    asset.klines.map(
                        (k) => ({
                            openTime: k.openTime,
                            closeTime: k.closeTime,
                            change: (
                                ((k.closePrice - openPrice) / openPrice)
                                *
                                100
                            )
                        })
                    )
            }
        },
    );

    const changeValues = assetChanges.flatMap(a => a.changes);

    const {
        minTime,
        maxTime,
        minChange,
        maxChange,
    } = getChangeLimits(changeValues);

    const changeBounds = {
        time: { min: minTime, max: maxTime },
        change: { min: minChange, max: maxChange },
        size: { width: canvasRect?.width ?? 0, height: canvasRect?.height ?? 0 },
    }

    const curves = (canvasRect && changeValues.length)
        ? (
            assetChanges
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
        )
        : [];

    const changeSteps = calculateChangeSteps({
        limit: 8,
        minChange,
        maxChange,
    });

    return (
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
                    !(isLoading || !klines?.length)
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
                    !(isLoading || !klines?.length)
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
    )
};

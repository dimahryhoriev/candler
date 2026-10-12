import { useCanvasRect } from "@/hooks/use-canvas-rect";
import { AssetKlines } from "@/lib/fetch-klines";
import { formatChange } from "@/lib/format";
import { calculateChangeSteps, getChangeLimits, scaleChangeToPoint } from "@/lib/math/change";
import { TimeframeKey } from "./performance-chart";

export function PerformanceChartViewport({
    klines,
    timeframeKey,
    colorsMap,
    isLoading,
}: {
    klines: AssetKlines[];
    timeframeKey?: TimeframeKey;
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
            assetChanges.map((asset) => {
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
                    + `L 0 ${canvasRect.height}`
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

    if (
        isLoading
        ||
        !klines?.length
    ) {
        return <div></div>
    }

    const changeSteps = calculateChangeSteps({
        limit: 8,
        minChange,
        maxChange,
    });

    return (
        <div
            className="
                flex w-full h-auto gap-4
            "
        >
            <svg
                className="w-full h-full"
                ref={ canvasRef }
            >
                {
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
                }
            </svg>
            <div
                className="
                    flex flex-col gap-8
                    h-full w-fit
                "
            >
                {
                    changeSteps.map(
                        (change, index) => (
                            <span
                                className="text-xs"
                                key={ `${index}` }
                            >
                                { formatChange(change) }
                            </span>
                        )
                    ).reverse()
                }
            </div>
        </div>
    )
};

import { useCanvasRect } from "@/hooks/use-canvas-rect";
import { AssetKlines } from "@/lib/fetch-klines";
import { formatChange } from "@/lib/format";
import { calculateChangeSteps, getChangeLimits, scaleChangeToPoint } from "@/lib/math/change";
import { TimeframeKey } from "./performance-chart";

export function PerformanceChartViewport({
    klines,
    timeframeKey,
    isLoading,
}: {
    klines: AssetKlines[];
    timeframeKey?: TimeframeKey;
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

    const lines = (canvasRect && changeValues.length)
        ? (
            assetChanges.map((asset) => {
                const points = (
                    asset.changes.map((c, index) => (
                        scaleChangeToPoint({
                            changeBounds: {
                                time: { min: minTime, max: maxTime },
                                change: { min: minChange, max: maxChange },
                                size: { width: canvasRect.width, height: canvasRect.height }
                            },
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

                return {
                    symbol: asset.symbol,
                    line,
                };
            })
        )
        : [];

    console.log(lines);

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
                flex w-full h-auto
            "
            ref={ canvasRef }
        >
            <svg
                className="w-full h-full"
            >
                {
                    lines.map((item) => (
                        <path
                            key={ item.symbol }
                            d={ item.line }
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={ 2 }
                        />
                    ))
                }
            </svg>
            <div
                className="
                    flex flex-col gap-8
                    h-full w-fit pr-12
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

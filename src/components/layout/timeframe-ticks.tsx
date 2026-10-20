import { CanvasRect } from "@/hooks/use-canvas-rect";
import { AssetKlines } from "@/lib/api/fetch-klines";
import { getTimeframeTicks, getTimeframeTicksCount, TimeframeKey } from "@/lib/charts/timeframes";

export function TimeframeTicks({
    assetsKlines,
    timeframeKey,
    canvasRect,
    isLoading,
}: {
    assetsKlines: AssetKlines[];
    timeframeKey: TimeframeKey;
    canvasRect?: CanvasRect;
    isLoading: boolean;
}) {
    const firstKlines = assetsKlines[0]?.klines;

    const timeframeOpenTime = !isLoading
        ? firstKlines[0].openTime
        : 0
    const timeframeCloseTime = !isLoading
        ? firstKlines[firstKlines.length - 1].closeTime
        : 0

    const timeframeTicks = !isLoading && canvasRect
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

    return (
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
                !isLoading
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
    )
}

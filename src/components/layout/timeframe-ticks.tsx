import { CanvasRect } from "@/hooks/use-canvas-rect";
import { AssetKlines } from "@/lib/api/fetch-klines";
import { getTimeframeTicks, TimeframeKey } from "@/lib/charts/timeframes";
import { useLayoutEffect, useMemo, useRef } from "react";

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
    const timeframeTicksRef = useRef<(HTMLSpanElement | null)[]>([]);

    const timeframeOpenTime = !isLoading
        ? Math.min(...assetsKlines.map(a => a.klines[0]?.openTime ?? Infinity))
        : 0

    const timeframeCloseTime = !isLoading
        ? Math.max(
            ...assetsKlines.map(
                a => a.klines[a.klines.length - 1]?.closeTime ?? -Infinity
            )
        )
        : 0

    const timeframeTicks = useMemo(() => {
        if (isLoading || !canvasRect) return [];

        return getTimeframeTicks({
            timeframeKey,
            timeRange: {
                openTime: timeframeOpenTime,
                closeTime: timeframeCloseTime,
            },
            canvasRect,
        })
    }, [
        canvasRect,
        isLoading,
        timeframeCloseTime,
        timeframeKey,
        timeframeOpenTime,
    ]);

    useLayoutEffect(() => {
        if (!canvasRect) return;

        timeframeTicksRef.current.forEach(
            (el, index) => {
                if (!el) return;

                const tick = timeframeTicks[index];
                if (!tick) return;

                const textWidth = el.getBoundingClientRect().width;
                const halfWidth = textWidth / 2;

                const isVisible = (
                    (tick.x - halfWidth >= 0)
                    &&
                    (tick.x + halfWidth <= canvasRect.width)
                );

                el.style.visibility = isVisible ? 'visible' : 'hidden';
            }
        )
    }, [timeframeTicks, canvasRect]);

    return (
        <div
            className="
                    flex justify-between items-center h-4
                    overflow-hidden text-xs font-bold
                "
            style={ {
                width: canvasRect?.width ?? 0
            } }
        >
            {
                !isLoading && canvasRect
                    ? (
                        timeframeTicks.map(
                            (tick, index) => (
                                <span
                                    className="absolute -translate-x-1/2 whitespace-nowrap"
                                    key={ `${index}` }
                                    ref={ (el) => { timeframeTicksRef.current[index] = el } }
                                    style={ { left: `${tick.x}px` } }
                                >
                                    {
                                        tick.label
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

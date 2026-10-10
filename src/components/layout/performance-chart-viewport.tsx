import { useCanvasRect } from "@/hooks/use-canvas-rect";
import { AssetKlines } from "@/lib/fetch-klines";
import { formatChange } from "@/lib/format";
import { calculateChangeSteps } from "@/lib/math/change";
import { diffPoints, Point } from "@/lib/math/point";
import { useLayoutEffect, useRef, useState } from "react";
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
    const startLabelRef = useRef<HTMLSpanElement | null>(null);

    const [startPoint, setStartPoint] = useState<Point>();

    useLayoutEffect(() => {
        if (startLabelRef.current && canvasRect) {
            setStartPoint(
                diffPoints(
                    {
                        x: canvasRect.x,
                        y: canvasRect.y,
                    },
                    {
                        x: startLabelRef.current.getBoundingClientRect().x,
                        y: startLabelRef.current.getBoundingClientRect().y,
                    }
                )
            )
        }
    }, [canvasRect]);

    if (
        isLoading
        ||
        !klines?.length
    ) {
        return <div></div>
    }

    const minPoint: Point | undefined = canvasRect ?
        {
            x: canvasRect.x + canvasRect.width,
            y: canvasRect.y + canvasRect.height,
        }
        :
        undefined;

    const maxPoint: Point | undefined = canvasRect ?
        {
            x: canvasRect.x,
            y: canvasRect.y,
        }
        : undefined;

    console.log(minPoint, maxPoint, startPoint);

    const changes = klines.flatMap(
        (asset) => {
            const openPrice = asset.klines[0]?.openPrice;
            if (!openPrice) return [];

            return asset.klines.map(
                (k) =>
                    ((k.closePrice - openPrice) / openPrice)
                    *
                    100
            );
        },
    );

    const minChange = Math.min(...changes);
    const maxChange = Math.max(...changes);

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
            <div
                className="w-full h-full"
            >

            </div>
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
                                ref={
                                    change === 0
                                        ? startLabelRef
                                        : null
                                }
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

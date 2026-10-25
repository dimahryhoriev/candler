import { ColorsMap } from "@/lib/charts/colors";
import { ChartAnchor } from "@/lib/charts/snapping";
import { dateTimeFormatters, formatChange, formatSymbol } from "@/lib/format";
import { Point } from "@/lib/math/point";

export function PerformanceChartGuideline({
    linePositionX,
    canvasHeight,
    anchors,
    colorsMap,
}: {
    linePositionX: number;
    canvasHeight: number;
    anchors: (ChartAnchor | null)[];
    colorsMap: ColorsMap;
}) {
    return (
        <g>
            <line
                x1={ linePositionX }
                y1={ 0 }
                x2={ linePositionX }
                y2={ canvasHeight }
                stroke="var(--muted-foreground)"
                strokeWidth={ 1 }
                opacity={ 0.3 }
            />
            {
                anchors
                    .filter(a => a !== null)
                    .map(
                        (a) => (
                            <circle
                                key={ a.symbol }
                                cx={ linePositionX }
                                cy={ a.point.position.y }
                                r={ 4 }
                                fill={ `var(${colorsMap.get(a.symbol)})` }
                            />
                        )
                    )
            }
        </g>
    )
};

export function PerformanceChartTooltip({
    anchors,
    crosshairPosition,
    colorsMap,
}: {
    anchors: ChartAnchor[];
    crosshairPosition: Point;
    colorsMap: ColorsMap;
}) {
    const anchorTimeMs = anchors[0].point.changeValues.closeTime;
    const date = dateTimeFormatters.DMY.format(anchorTimeMs);
    const hours = dateTimeFormatters.H.format(anchorTimeMs);

    return (
        <div
            className="
                flex flex-col w-fit h-fit gap-2 p-2
                bg-zinc-800 rounded-sm relative
            "
            style={ {
                position: 'absolute',
                left: `${crosshairPosition.x + 12}px`,
                top: `${crosshairPosition.y}px`,
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
            } }
        >
            <div
                className="
                    flex flex-col gap-0.5
                "
            >
                {
                    anchors.map(
                        (a) => {
                            const symbol = formatSymbol(a.symbol, 'capitalize');
                            const change = formatChange(a.point.changeValues.change);

                            return (
                                <div
                                    key={ a.symbol }
                                    className="
                                    flex gap-6 text-white text-xs font-semibold
                                    items-center justify-between
                                "
                                >
                                    <div
                                        className="flex gap-1 items-center"
                                    >
                                        <div
                                            className="
                                            w-2 h-2 rounded-full
                                        "
                                            style={ {
                                                backgroundColor: `var(${colorsMap.get(a.symbol)})`
                                            } }
                                        />
                                        <span>
                                            {
                                                symbol
                                            }
                                        </span>
                                    </div>
                                    <span className="font-normal">
                                        {
                                            change
                                        }
                                    </span>
                                </div>
                            )
                        })
                }
            </div>
            <div
                className="
                    flex flex-col font-medium w-full items-center
                    text-zinc-400 text-[10px]
                "
            >
                <span>
                    {
                        date
                    }
                </span>
                <span>
                    {
                        hours
                    }
                </span>
            </div>
        </div >
    )
};

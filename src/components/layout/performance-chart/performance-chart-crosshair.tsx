import { ColorsMap } from "@/lib/charts/colors";

type GuidelineAnchor = {
    symbol: string;
    positionY: number;
};

export function PerformanceChartGuideline({
    linePositionX,
    canvasHeight,
    anchors,
    colorsMap,
}: {
    linePositionX: number;
    canvasHeight: number;
    anchors: GuidelineAnchor[];
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
                anchors.map(
                    (a) => (
                        <circle
                            key={ a.symbol }
                            cx={ linePositionX }
                            cy={ a.positionY }
                            r={ 4 }
                            fill={ `var(${colorsMap.get(a.symbol)})` }
                        />
                    )
                )
            }
        </g>
    )
};

import { ColorsMap } from "@/lib/charts/colors";
import { ChartAnchor } from "@/lib/charts/snapping";

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

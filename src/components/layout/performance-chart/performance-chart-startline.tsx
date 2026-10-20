import { CanvasRect } from "@/hooks/use-canvas-rect";

export function PerformanceChartStartline({
    canvasRect,
}: {
    canvasRect?: CanvasRect;
}) {
    return (
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
    );
};

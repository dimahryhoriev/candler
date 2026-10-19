import { CanvasRect } from "@/hooks/use-canvas-rect";
import { Point } from "@/lib/math/point";
import { useCallback, useState } from "react";

export function useChartCrosshair(
    canvasRect: CanvasRect | undefined,
) {
    const [point, setPoint] = useState<Point | null>(null);

    const onPointerMove = useCallback(
        (e: React.PointerEvent<SVGElement>) => {
            if (!canvasRect) return;

            setPoint({
                x: e.clientX - canvasRect.x,
                y: e.clientY - canvasRect.y,
            });
        }, [canvasRect]
    );

    const onPointerLeave = useCallback(
        () => {
            setPoint(null);
        }, []
    );

    return {
        point,
        onPointerMove,
        onPointerLeave,
    };
};

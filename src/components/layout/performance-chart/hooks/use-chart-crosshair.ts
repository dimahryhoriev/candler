import { Point } from "@/lib/math/point";
import { useCallback, useLayoutEffect, useState } from "react";

export function useChartCrosshair() {
    const [point, setPoint] = useState<Point | null>(null);

    const onScroll = () => setPoint(null);

    useLayoutEffect(() => {
        window.addEventListener(
            'scroll',
            onScroll,
            {
                capture: true,
                passive: true,
            },
        );

        return () => {
            window.removeEventListener(
                'scroll',
                onScroll,
                {
                    capture: true,
                },
            );
        };
    }, []);

    const onPointerMove = useCallback(
        (e: React.PointerEvent<SVGElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();

            setPoint({
                x: e.clientX - rect.x,
                y: e.clientY - rect.y,
            });
        }, []
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

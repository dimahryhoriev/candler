import { AssetPoints } from "@/lib/assets/assets-calculations";
import { ColorsMap } from "@/lib/charts/colors";
import { Point } from "@/lib/math/point";
import { useCurveHover } from "./hooks/use-curve-hover";

export type Curve = {
    symbol: string;
    line: string;
    fill: string;
};

export function CurveArea({
    curves,
    colorsMap,
    cursorPosition,
    assetsPoints,
}: {
    curves: Curve[];
    colorsMap: ColorsMap;
    cursorPosition?: Point | null;
    assetsPoints: AssetPoints[];
}) {
    const hoveredCurve = useCurveHover(
        assetsPoints,
        cursorPosition ?? null,
    );

    return (
        curves.map((curve) => {
            const isHovered = !(hoveredCurve && curve.symbol !== hoveredCurve);

            return (
                <g
                    key={ curve.symbol }
                    opacity={
                        isHovered
                            ? 100
                            : 0
                    }
                    style={ {
                        pointerEvents: isHovered
                            ? 'auto'
                            : 'none'
                    } }
                >
                    <path
                        d={ curve.fill }
                        fill={ `var(${colorsMap.get(curve.symbol)}-secondary)` }
                        opacity={ 0.85 }
                        style={ {
                            pointerEvents: 'none',
                        } }
                    />
                    <path
                        d={ curve.line }
                        fill="none"
                        stroke={ `var(${colorsMap.get(curve.symbol)})` }
                        strokeWidth={ 1.8 }
                    />
                </g>
            );
        })
    )
}

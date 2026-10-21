import { ColorsMap } from "@/lib/charts/colors";

export type Curve = {
    symbol: string;
    line: string;
    fill: string;
};

export function CurveArea({
    curves,
    colorsMap,
}: {
    curves: Curve[];
    colorsMap: ColorsMap;
}) {
    return (
        curves.map((curve) => (
            <g
                key={ curve.symbol }
            >
                <path
                    d={ curve.fill }
                    fill={ `var(${colorsMap.get(curve.symbol)}-secondary)` }
                    opacity={ 0.85 }
                />
                <path
                    d={ curve.line }
                    fill="none"
                    stroke={ `var(${colorsMap.get(curve.symbol)})` }
                    strokeWidth={ 1.8 }
                />
            </g>
        ))
    )
}

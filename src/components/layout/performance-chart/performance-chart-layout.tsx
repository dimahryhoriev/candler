'use client'

import { AssetKlines } from "@/lib/api/fetch-klines";
import { ColorsMap } from "@/lib/charts/colors";
import { TimeframeKey } from "@/lib/charts/timeframes";
import { formatSymbol } from "@/lib/format";
import { PerformanceChartActions } from "./performance-chart-actions";
import { PerformanceChartViewport } from "./performance-chart-viewport";

export function PerformanceChartLayout({
    title,
    assetsKlines,
    limit,
    timeframeKey,
    onTimeframeChange,
    colorsMap,
    isLoading = false,
}: {
    title: string;
    assetsKlines: AssetKlines[];
    limit: number;
    timeframeKey: TimeframeKey;
    onTimeframeChange: (value: TimeframeKey) => void;
    colorsMap: ColorsMap;
    isLoading: boolean;
}) {
    return (
        <div
            className="
                flex flex-col gap-6 w-full
            "
        >
            <span
                className="
                    text-xl font-medium w-fit
                "
            >
                { title }
            </span>
            <PerformanceChartViewport
                assetsKlines={ assetsKlines }
                colorsMap={ colorsMap }
                timeframeKey={ timeframeKey }
                isLoading={ isLoading }
            />
            <ul
                className="
                    text-sm text-muted-foreground
                    flex gap-6 justify-center
                "
            >
                {
                    assetsKlines.length
                        ? (
                            assetsKlines.map(
                                (k) => {
                                    const symbol = formatSymbol(
                                        k.symbol,
                                        'capitalize'
                                    );
                                    const color = colorsMap.get(k.symbol);

                                    return (
                                        <li
                                            className="
                                                flex items-center gap-1
                                            "
                                            key={ symbol }
                                        >
                                            <div
                                                className='w-2 h-2 rounded-full'
                                                style={ {
                                                    backgroundColor: `var(${color})`,
                                                } }
                                            />
                                            <span>
                                                { symbol }
                                            </span>
                                        </li>
                                    )
                                }
                            )
                        )
                        : Array.from(
                            { length: limit },
                            (_, index) => (
                                <li
                                    className="
                                                flex items-center gap-1
                                            "
                                    key={ index }
                                >
                                    <div
                                        className='w-2 h-2 rounded-full'
                                        style={ {
                                            backgroundColor: `var(--muted)`,
                                        } }
                                    />
                                    <span>
                                        --
                                    </span>
                                </li>
                            )
                        )
                }
            </ul>
            <PerformanceChartActions
                timeframeKey={ timeframeKey }
                onChange={ onTimeframeChange }
            />
        </div>
    );
};

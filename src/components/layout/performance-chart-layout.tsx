'use client'

import { AssetKlines } from "@/lib/fetch-klines";
import { formatSymbol } from "@/lib/format";
import { TimeframeKey } from "./performance-chart";
import { PerformanceChartActions } from "./performance-chart-actions";
import { PerformanceChartViewport } from "./performance-chart-viewport";

export function PerformanceChartLayout({
    title,
    klines,
    timeframeKey,
    onTimeframeChange,
    colorsMap,
    isLoading = false,
}: {
    title: string;
    klines: AssetKlines[];
    timeframeKey?: TimeframeKey;
    onTimeframeChange: (value: TimeframeKey) => void;
    colorsMap: Map<string, string>;
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
                klines={ klines }
                timeframeKey={ timeframeKey }
                colorsMap={ colorsMap }
                isLoading={ isLoading }
            />
            <ul
                className="
                    text-sm text-muted-foreground
                    flex gap-6 justify-center
                "
            >
                {
                    klines.map(
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
                                            backgroundColor: `var(${color})`
                                        } }
                                    />
                                    <span>
                                        { symbol }
                                    </span>
                                </li>
                            )
                        }
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

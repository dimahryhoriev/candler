'use client'

import { AssetKlines } from "@/lib/fetch-klines";
import { TimeframeKey } from "./performance-chart";
import { PerformanceChartViewport } from "./performance-chart-viewport";

export function PerformanceChartLayout({
    title,
    klines,
    timeframeKey = '1D',
    isLoading = false,
}: {
    title: string;
    klines: AssetKlines[];
    timeframeKey?: TimeframeKey;
    isLoading: boolean;
}) {
    console.log(klines)
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
                isLoading={ isLoading }
            />
        </div>
    );
};

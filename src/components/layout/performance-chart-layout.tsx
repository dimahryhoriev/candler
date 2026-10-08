import { AssetKlines } from "@/lib/fetch-klines";
import { TimeframeKey } from "./performance-chart";

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
    return (
        <div
            className="
                flex flex-col gap-6 w-full
            "
        >

        </div>
    )
};

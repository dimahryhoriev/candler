import { Timeframe } from "./performance-chart";

export function PerformanceChartLayout({
    title,
    timeframe = '1D',
}: {
    title: string;
    timeframe?: Timeframe;
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

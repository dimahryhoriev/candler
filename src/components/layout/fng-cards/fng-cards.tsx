import { fetchFng, FngItemsList } from "@/lib/api/fetch-fng";
import { FngHistoricalValuesCard } from "./fng-historical-values-card";
import { FngIndicatorCard } from "./fng-indicator-card";
import { FngYearlyExtremesCard } from "./fng-yearly-extremes-card";

export type FngLines = string[];

export async function FngCards({
    title = 'Crypto Fear and Greed Index',
}: {
    title?: string;
}) {
    const fngTicks: FngItemsList = await fetchFng();
    const lines: FngLines = [
        '--status-extreme-fear',
        '--status-fear',
        '--status-neutral',
        '--status-greed',
        '--status-extreme-greed'
    ];

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
                {
                    title
                }
            </span>
            <div
                className="
                    grid grid-cols-1 md:grid-cols-3
                    items-stretch gap-6
                "
            >
                <FngIndicatorCard
                    fngTicks={ fngTicks }
                    lines={ lines }
                />
                <FngHistoricalValuesCard
                    fngTicks={ fngTicks }
                />
                <FngYearlyExtremesCard
                    fngTicks={ fngTicks }
                />
            </div>
        </div>
    );
};

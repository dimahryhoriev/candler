import { FngItemsList } from "@/lib/api/fetch-fng";
import { capitalizeString, dateTimeFormatters } from "@/lib/format";
import { getFngStatus } from "./get-fng-status";

export function FngYearlyExtremesCard({
    title = 'Yearly High and Low',
    fngTicks,
}: {
    title?: string;
    fngTicks: FngItemsList;
}) {
    const extremes = getFngYearlyExtremes(fngTicks);
    if (!extremes) return null;

    const { low, high } = extremes;
    const lowStatus = getFngStatus(low.value);
    const highStatus = getFngStatus(high.value);

    return (
        <div
            className="
                border rounded-xl hover:cursor-pointer
                transition-colors duration-100 flex
                bg-background hover:bg-secondary p-4
                w-full h-full gap-4 flex flex-col items-center
            "
        >
            <span
                className="
                    text-base self-start font-semibold font-mono
                "
            >
                {
                    title
                }
            </span>
            <div
                className="
                    flex flex-col gap-2 w-full text-xs
                "
            >
                <div className="flex justify-between items-center">
                    <span className="text-zinc-500 font-medium">
                        {
                            `Yearly Low (${dateTimeFormatters.DMY.format(low.date)})`
                        }
                    </span>
                    <div
                        className="
                            flex w-fit h-fit justify-center items-center
                            px-3 py-1 rounded-full text-white font-bold
                        "
                        style={ {
                            background: `var(--status-${lowStatus})`
                        } }
                    >
                        {
                            `${lowStatus?.split("-").map(capitalizeString).join(" ")} - ${low.value}`
                        }
                    </div>
                </div>
                <div className="flex justify-between">
                    <span className="text-zinc-500 font-medium">
                        {
                            `Yearly High (${dateTimeFormatters.DMY.format(high.date)})`
                        }
                    </span>
                    <div
                        className="
                            flex w-fit h-fit justify-center items-center
                            px-3 py-1 rounded-full text-white font-bold
                        "
                        style={ {
                            background: `var(--status-${highStatus})`
                        } }
                    >
                        {
                            `${highStatus?.split("-").map(capitalizeString).join(" ")} - ${high.value}`
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

type FngYearlyExtreme = {
    value: number;
    date: Date;
};

type FngYearlyExtremes = {
    low: FngYearlyExtreme;
    high: FngYearlyExtreme;
};

function getFngYearlyExtremes(
    fngTicks: FngItemsList,
): FngYearlyExtremes | null {
    if (!fngTicks || fngTicks.length === 0) return null;

    const lowestTick = fngTicks.reduce(
        (acc, curr) => {
            const currValue = Number(curr.value);
            const minValue = Number(acc.value);

            if (currValue < minValue) return curr;
            if (
                currValue === minValue
                &&
                Number(curr.timestamp) > Number(acc.timestamp)
            ) {
                return curr;
            };

            return acc;
        },
    );

    const highestTick = fngTicks.reduce(
        (acc, curr) => {
            const currValue = Number(curr.value);
            const maxValue = Number(acc.value);

            if (currValue > maxValue) return curr;
            if (
                currValue === maxValue
                &&
                Number(curr.timestamp) > Number(acc.timestamp)
            ) {
                return curr;
            };

            return acc;
        },
    );

    return {
        low: {
            value: Number(lowestTick.value),
            date: new Date(Number(lowestTick.timestamp) * 1000),
        },
        high: {
            value: Number(highestTick.value),
            date: new Date(Number(highestTick.timestamp) * 1000),
        },
    };
};

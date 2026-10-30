import { FngItemsList } from "@/lib/api/fetch-fng";
import { capitalizeString } from "@/lib/format";
import { getFngStatus } from "./get-fng-status";

export function FngHistoricalValuesCard({
    title = 'Historical Values',
    fngTicks,
}: {
    title?: string;
    fngTicks: FngItemsList;
}) {
    const makeItem = (tick: FngItemsList[number], label: string) => {
        const color = getFngStatus(Number(tick.value));
        const status = color?.split("-").map(capitalizeString).join(" ");

        return {
            status,
            label,
            color,
            value: tick.value,
        };
    };

    const values = [
        makeItem(fngTicks[1], 'Yesterday'),
        makeItem(fngTicks[7], 'Last Week'),
        makeItem(fngTicks[30], 'Last Month'),
    ];

    return (
        <div
            className="
                border rounded-xl hover:cursor-pointer justify-between
                transition-colors duration-100 flex
                bg-background hover:bg-secondary p-4
                w-full h-full gap-4 flex flex-col items-center
            "
        >
            <span
                className="
                    text-base self-start font-semibold
                "
            >
                {
                    title
                }
            </span>
            <div className="flex flex-col gap-2 w-full text-xs">
                {
                    values.map(
                        (v, index) => (
                            <div
                                key={ index }
                                className="flex justify-between items-center"
                            >
                                <span
                                    className="font-medium text-zinc-500"
                                >
                                    {
                                        v.label
                                    }
                                </span>
                                <div
                                    className="
                                        flex w-fit h-fit justify-center items-center
                                        px-3 py-1 rounded-full text-zinc-500 font-bold
                                    "
                                    style={ {
                                        background: `color-mix(in srgb, var(--status-${v.color}) 25%, transparent)`
                                    } }
                                >
                                    {
                                        `${v.status} - ${v.value}`
                                    }
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}

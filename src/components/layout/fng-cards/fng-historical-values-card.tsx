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
    const makeItem = (label: string, tick?: FngItemsList[number]) => {
        const value = tick?.value;
        const color = value ? getFngStatus(Number(value)) : null;
        const status = color?.split("-").map(capitalizeString).join(" ");

        return {
            status: status ?? '--',
            label,
            color,
            value: value ?? '--',
        };
    };

    const values = [
        makeItem('Yesterday', fngTicks[1]),
        makeItem('Last Week', fngTicks[7]),
        makeItem('Last Month', fngTicks[30]),
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
                                        background: v.color
                                            ? `color-mix(in srgb, var(--status-${v.color}) 25%, transparent)`
                                            : 'var(--muted-foreground)'
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

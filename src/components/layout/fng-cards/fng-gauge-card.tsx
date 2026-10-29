import { FngItemsList } from "@/lib/api/fetch-fng";

export function FngGaugeCard({
    title = 'Current Value',
    fngTicks,
}: {
    title?: string;
    fngTicks: FngItemsList;
}) {
    const lastTick = fngTicks[fngTicks.length - 1];

    return (
        <div
            className="
                border rounded-xl hover:cursor-pointer
                transition-colors duration-100 flex
                bg-background hover:bg-secondary p-4
                w-full gap-2
            "
        >
            <span
                className="
                    text-base
                "
            >
                {
                    title
                }
            </span>
        </div>
    )
};

function FngRadialGauge({
    fngIndex,
}: {
    fngIndex: number;
}) {
    return (
        <svg>

        </svg>
    )
}

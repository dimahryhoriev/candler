import { fetchFng, FngItemsList } from "@/lib/api/fetch-fng";
import { FngGaugeCard } from "./fng-gauge-card";

export async function FngCards({
    title = 'Crypto Fear and Greed Index',
}: {
    title?: string;
}) {
    const fngTicks: FngItemsList = await fetchFng();

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
                    flex items-center text-xs gap-6
                "
            >
                <FngGaugeCard
                    fngTicks={ fngTicks }
                />
                <FngGaugeCard
                    fngTicks={ fngTicks }
                />
                <FngGaugeCard
                    fngTicks={ fngTicks }
                />
            </div>
        </div>
    );
};

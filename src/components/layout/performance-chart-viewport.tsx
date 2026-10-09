import { AssetKlines } from "@/lib/fetch-klines";
import { formatChange } from "@/lib/format";
import { calculateChangeSteps } from "@/lib/math";
import { TimeframeKey } from "./performance-chart";

export function PerformanceChartViewport({
    klines,
    timeframeKey,
    isLoading,
}: {
    klines: AssetKlines[];
    timeframeKey?: TimeframeKey;
    isLoading: boolean;
}) {
    if (
        isLoading
        ||
        !klines?.length
    ) {
        return <div></div>
    }

    const changes = klines.flatMap(
        (asset) => {
            const openPrice = asset.klines[0]?.openPrice;
            if (!openPrice) return [];

            return asset.klines.map(
                (k) =>
                    ((k.closePrice - openPrice) / openPrice)
                    *
                    100
            );
        },
    );

    const maxAbs = Math.max(...changes.map(Math.abs));

    const changeSteps = calculateChangeSteps({
        limit: 8,
        minChange: -maxAbs,
        maxChange: maxAbs,
    }).map(
        (change) => formatChange(change),
    );

    return (
        <div
            className="
                flex w-full h-auto
            "
        >
            <div
                className="
                    flex flex-col gap-4
                    h-full w-full
                "
            >
                {
                    changeSteps.map(
                        (change, index) => (
                            <span
                                className="text-xs"
                                key={ `${index}` }
                            >
                                { change }
                            </span>
                        )
                    ).reverse()
                }
            </div>
        </div>
    )
};

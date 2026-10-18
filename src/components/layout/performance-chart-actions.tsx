'use client'

import { TimeframeKey, timeframesMap } from "@/lib/timeframes";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

export function PerformanceChartActions({
    timeframeKey,
    onChange,
}: {
    timeframeKey: TimeframeKey;
    onChange: (value: TimeframeKey) => void;
}) {
    return (
        <ToggleGroup
            type="single"
            value={ timeframeKey }
            onValueChange={
                (value: TimeframeKey) => {
                    if (value) onChange(value);
                }
            }
            className="justify-center gap-1 w-full"
        >
            {
                Object
                    .keys(timeframesMap)
                    .map(
                        (timeframe) => (
                            <ToggleGroupItem
                                key={ timeframe }
                                value={ timeframe }
                                className="cursor-pointer"
                            >
                                { timeframe }
                            </ToggleGroupItem>
                        )
                    )
            }
        </ToggleGroup>
    )
}

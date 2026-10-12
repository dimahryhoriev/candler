'use client'

import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { TimeframeKey, timeframesMap } from "./performance-chart";

export function PerformanceChartActions({
    timeframeKey = '1M',
    onChange,
}: {
    timeframeKey?: TimeframeKey;
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
                            >
                                { timeframe }
                            </ToggleGroupItem>
                        )
                    )
            }
        </ToggleGroup>
    )
}

import { IntervalKey } from "../api/fetch-klines";
import { formatDate } from "../format";
import { roundToStep } from "../math/round";

type TimeRange = {
    openTime: number;
    closeTime: number;
};

export type TimeframeTickFormat = 'H' | 'D' | 'W' | 'M' | 'Y';

export type TimeframeKey =
    | '1D' | '1W' | '1M'
    | '3M' | '6M' | '1Y'
    | '5Y' | 'ALL';

type TimeframeValues = {
    interval: IntervalKey;
    limit: number;
    tickFormat: TimeframeTickFormat;
};

export type TimeframesMap = Record<TimeframeKey, TimeframeValues>;

export const timeframesMap: TimeframesMap = {
    '1D': { interval: '5m', limit: 288, tickFormat: 'H' },
    '1W': { interval: '30m', limit: 336, tickFormat: 'D' },
    '1M': { interval: '2h', limit: 360, tickFormat: 'W' },
    '3M': { interval: '8h', limit: 270, tickFormat: 'W' },
    '6M': { interval: '12h', limit: 360, tickFormat: 'M' },
    '1Y': { interval: '1d', limit: 365, tickFormat: 'M' },
    '5Y': { interval: '1w', limit: 260, tickFormat: 'Y' },
    'ALL': { interval: '1M', limit: 1000, tickFormat: 'Y' },
};

export function getTimeframeTicks({
    timeframeKey,
    timeRange,
    count,
}: {
    timeframeKey: TimeframeKey,
    timeRange: TimeRange,
    count: number,
}) {
    const formatKey = timeframesMap[timeframeKey].tickFormat;

    const openTime = timeRange.openTime;
    const closeTime = timeRange.closeTime;
    const timeRangeDiff = closeTime - openTime;

    const step = count > 1
        ? timeRangeDiff / (count - 1)
        : 0;

    return (
        Array.from(
            { length: count },
            (_, i) => {
                const hourMs = 60 * 60 * 1000;

                return (
                    formatDate({
                        dateMs: roundToStep(
                            openTime + (i * step),
                            hourMs,
                            'floor',
                        ),
                        formatKey,
                    })
                );
            }
        )
    );
};

export function getTimeframeTicksCount(
    axisWidth?: number,
) {
    if (!axisWidth) return 0;

    switch (true) {
        case axisWidth < 1024: return 4;
        case axisWidth < 1280: return 4;
        case axisWidth < 1536: return 5;
        default: return 6;
    };
};

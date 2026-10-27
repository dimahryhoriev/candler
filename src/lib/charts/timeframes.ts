import { CanvasRect } from "@/hooks/use-canvas-rect";
import { IntervalKey } from "../api/fetch-klines";
import { formatDate } from "../format";

type TimeRange = {
    openTime: number;
    closeTime: number;
};

export type TimeframeTickFormat = 'H' | 'D' | 'W' | 'M' | 'Y';

export type TimeframeTick = {
    label: string;
    x: number;
};

export type TimeframeKey =
    | '1D' | '1W' | '1M'
    | '3M' | '6M' | '1Y'
    | '5Y' | 'ALL';

type TimeframeValues = {
    interval: IntervalKey;
    limit: number;
    tickFormat: TimeframeTickFormat;
    tickStep: number;
};

export type TimeframesMap = Record<TimeframeKey, TimeframeValues>;

export const timeframesMap: TimeframesMap = {
    '1D': { interval: '5m', limit: 288, tickFormat: 'H', tickStep: 6 },
    '1W': { interval: '30m', limit: 336, tickFormat: 'D', tickStep: 2 },
    '1M': { interval: '2h', limit: 360, tickFormat: 'W', tickStep: 1 },
    '3M': { interval: '8h', limit: 270, tickFormat: 'W', tickStep: 3 },
    '6M': { interval: '12h', limit: 360, tickFormat: 'M', tickStep: 2 },
    '1Y': { interval: '1d', limit: 365, tickFormat: 'M', tickStep: 3 },
    '5Y': { interval: '1w', limit: 260, tickFormat: 'Y', tickStep: 1 },
    'ALL': { interval: '1M', limit: 1000, tickFormat: 'Y', tickStep: 2 },
};

export function getTimeframeTicks({
    timeframeKey,
    timeRange,
    canvasRect,
}: {
    timeframeKey: TimeframeKey;
    timeRange: TimeRange;
    canvasRect: CanvasRect;
}): TimeframeTick[] {
    const { tickFormat, tickStep } = timeframesMap[timeframeKey];
    const width = canvasRect.width;
    const { openTime, closeTime } = timeRange;

    const timeRangeDiff = closeTime - openTime;
    if (timeRangeDiff <= 0 || width <= 0) return [];

    const ticks: TimeframeTick[] = [];

    const timeAnchor = new Date(roundTimeframeTickTime(openTime, tickFormat));

    if (timeAnchor.getTime() < openTime) {
        addCalendarStep(timeAnchor, timeframeKey, tickStep);
    };

    while (timeAnchor.getTime() <= closeTime) {
        const time = timeAnchor.getTime();
        const x = ((time - openTime) / timeRangeDiff) * width;

        ticks.push({
            label: formatDate({
                dateMs: time,
                formatKey: tickFormat,
            }),
            x,
        });

        addCalendarStep(timeAnchor, timeframeKey, tickStep);
    };

    return ticks;
};

function roundTimeframeTickTime(
    timeMs: number,
    tickFormat: TimeframeTickFormat,
) {
    const date = new Date(timeMs);

    switch (tickFormat) {
        case 'H':
            date.setHours((Math.floor(date.getHours() / 6) * 6), 0, 0, 0)
            return date.getTime();
        case 'D':
            date.setHours(0, 0, 0, 0);
            return date.getTime();
        case 'W':
            date.setHours(0, 0, 0, 0);
            const day = date.getDay();
            const diff = date.getDate() - day + (day === 0 ? -6 : 1);
            date.setDate(diff);
            return date.getTime();
        case 'M':
            date.setDate(1);
            date.setHours(0, 0, 0, 0);
            return date.getTime();
        case 'Y':
            date.setMonth(0, 1);
            date.setHours(0, 0, 0, 0);
            return date.getTime();
        default:
            return timeMs;
    };
};

function addCalendarStep(
    date: Date,
    timeframeKey: TimeframeKey,
    tickStep: number = 1,
) {
    switch (timeframeKey) {
        case '1D':
            date.setHours(date.getHours() + tickStep);
            break;

        case '1W':
            date.setDate(date.getDate() + tickStep);
            break;

        case '1M':
        case '3M':
            date.setDate(date.getDate() + (tickStep * 7));
            break;

        case '6M':
        case '1Y':
            date.setDate(1);
            date.setMonth(date.getMonth() + tickStep);
            break;

        case '5Y':
        case 'ALL':
            date.setFullYear(date.getFullYear() + tickStep);
            break;
    };
};

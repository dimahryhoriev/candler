import { CanvasRect } from "@/hooks/use-canvas-rect";
import { IntervalKey } from "../api/fetch-klines";
import { AssetPoints } from "../assets/assets-calculations";
import { formatDate } from "../format";
import { findClosestPoint } from "../math/point";

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
    oldestAsset,
    timeframeKey,
    timeRange,
    canvasRect,
}: {
    oldestAsset: AssetPoints;
    timeframeKey: TimeframeKey;
    timeRange: TimeRange;
    canvasRect: CanvasRect;
}): TimeframeTick[] {
    const { tickFormat, tickStep } = timeframesMap[timeframeKey];
    const { openTime, closeTime } = timeRange;
    const width = canvasRect.width;

    const timeRangeDiff = closeTime - openTime;
    if (timeRangeDiff <= 0 || width <= 0) return [];

    const ticks: TimeframeTick[] = [];

    const timeAnchor = new Date(roundTimeframeTickTime(openTime, tickFormat));

    if (timeAnchor.getTime() < openTime) {
        addCalendarStep(timeAnchor, timeframeKey, tickStep);
    };

    while (timeAnchor.getTime() <= closeTime) {
        const time = timeAnchor.getTime();
        const rawX = ((time - openTime) / timeRangeDiff) * width;
        const snappedX = findClosestPoint({
            points: oldestAsset.points.flatMap(p => p.position),
            targetPoint: {
                x: ((time - openTime) / timeRangeDiff) * width,
                y: 0,
            },
            findBy: 'x',
        })?.x;

        ticks.push({
            label: formatDate({
                dateMs: time,
                formatKey: tickFormat,
            }),
            x: snappedX ?? rawX,
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
            date.setUTCHours((Math.floor(date.getUTCHours() / 6) * 6), 0, 0, 0)
            return date.getTime();
        case 'D':
            date.setUTCHours(0, 0, 0, 0);
            return date.getTime();
        case 'W':
            date.setUTCHours(0, 0, 0, 0);
            const day = date.getUTCDay();
            const diff = date.getUTCDate() - day + (day === 0 ? -6 : 1);
            date.setUTCDate(diff);
            return date.getTime();
        case 'M':
            date.setUTCDate(1);
            date.setUTCHours(0, 0, 0, 0);
            return date.getTime();
        case 'Y':
            date.setUTCDate(1);
            date.setUTCMonth(0, 1);
            date.setUTCHours(0, 0, 0, 0);
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
            date.setUTCHours(date.getUTCHours() + tickStep);
            break;

        case '1W':
            date.setUTCDate(date.getUTCDate() + tickStep);
            break;

        case '1M':
        case '3M':
            date.setUTCDate(date.getUTCDate() + (tickStep * 7));
            break;

        case '6M':
        case '1Y':
            date.setUTCDate(1);
            date.setUTCMonth(date.getUTCMonth() + tickStep);
            break;

        case '5Y':
        case 'ALL':
            date.setUTCFullYear(date.getUTCFullYear() + tickStep);
            break;
    };
};

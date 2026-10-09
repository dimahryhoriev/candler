'use client'

import { useAssets } from "@/hooks/use-assets";
import { fetchKlines, IntervalKey } from "@/lib/fetch-klines";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { PerformanceChartLayout } from "./performance-chart-layout";

export type TimeframeKey =
    | '1D' | '1W' | '1M'
    | '3M' | '6M' | '1Y'
    | '5Y' | 'ALL';

type TimeframeValues = {
    interval: IntervalKey;
    limit: number;
};

type TimeframeMap = Record<TimeframeKey, TimeframeValues>;

const timeframeToIntervalMap: TimeframeMap = {
    '1D': { interval: '5m', limit: 288 },
    '1W': { interval: '30m', limit: 336 },
    '1M': { interval: '2h', limit: 360 },
    '3M': { interval: '8h', limit: 270 },
    '6M': { interval: '12h', limit: 360 },
    '1Y': { interval: '1d', limit: 365 },
    '5Y': { interval: '1w', limit: 260 },
    'ALL': { interval: '1M', limit: 1000 },
};

export function PerformanceChart({
    assetsType,
    timeframeKey = '1D',
}: {
    assetsType: 'majors' | 'altcoins';
    timeframeKey?: TimeframeKey;
}) {
    const {
        interval,
        limit,
    } = timeframeToIntervalMap[timeframeKey];

    const { assets } = useAssets({
        limit: assetsType === 'majors' ? 2 : 6,
        typeOptions: {
            stables: false,
            majors: assetsType === 'majors',
            altcoins: assetsType === 'altcoins',
        },
    });

    const symbols = useMemo(() => {
        return (
            assets
                ?.map((a) => a?.s)
                .filter(
                    (s): s is string => Boolean(s)
                )
            ??
            []
        );
    }, [assets]);

    const {
        data: klines = [],
        isLoading,
    } = useQuery({
        queryKey: ['klines', symbols, interval, limit],
        queryFn: () => (
            fetchKlines({
                symbols,
                interval,
                limit,
            })
        ),
        enabled: symbols.length > 0,
    });

    return (
        <PerformanceChartLayout
            title={
                assetsType === 'majors'
                    ? 'Majors Performance'
                    : 'Altcoins Performance'
            }
            klines={ klines }
            timeframeKey={ timeframeKey }
            isLoading={ isLoading }
        />
    );
};

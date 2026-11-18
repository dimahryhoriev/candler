'use client'

import { useAssets } from "@/hooks/use-assets";
import { fetchKlines } from "@/lib/api/fetch-klines";
import { getAssetsSymbols } from "@/lib/assets/assets-unpackers";
import { ColorsMap, createColorsMap } from "@/lib/charts/colors";
import { TimeframeKey, TimeframesCanvasMap } from "@/lib/charts/timeframes";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { PerformanceChartLayout } from "./performance-chart-layout";

export const performanceChartTimeframesCanvasMap: TimeframesCanvasMap = {
    '1D': { interval: '5m', limit: 288, tickFormat: 'H', tickStep: 6 },
    '1W': { interval: '30m', limit: 336, tickFormat: 'D', tickStep: 2 },
    '1M': { interval: '2h', limit: 360, tickFormat: 'W', tickStep: 1 },
    '3M': { interval: '8h', limit: 270, tickFormat: 'W', tickStep: 3 },
    '6M': { interval: '12h', limit: 360, tickFormat: 'M', tickStep: 2 },
    '1Y': { interval: '1d', limit: 365, tickFormat: 'M', tickStep: 3 },
    '5Y': { interval: '1w', limit: 260, tickFormat: 'Y', tickStep: 1 },
    'ALL': { interval: '1M', limit: 1000, tickFormat: 'Y', tickStep: 2 },
};

export function PerformanceChart({
    assetsType,
}: {
    assetsType: 'majors' | 'altcoins';
}) {
    const [timeframeKey, setTimeframeKey] = useState<TimeframeKey>('1M');

    const {
        interval,
        limit: timeframesLimit,
    } = performanceChartTimeframesCanvasMap[timeframeKey];

    const assetsLimit = assetsType === 'majors' ? 2 : 6;

    const { assets } = useAssets({
        limit: assetsLimit,
        typeOptions: {
            stables: false,
            majors: assetsType === 'majors',
            altcoins: assetsType === 'altcoins',
        },
    });

    const symbols = useMemo(() => getAssetsSymbols(assets), [assets]);

    const colorsMap: ColorsMap = useMemo(() => {
        return createColorsMap(
            symbols,
            [
                '--chart-1', '--chart-2', '--chart-3',
                '--chart-4', '--chart-5', '--chart-6',
            ],
        )
    }, [symbols]);

    const {
        data: klines = [],
        isLoading,
    } = useQuery({
        queryKey: ['klines', symbols, interval, timeframesLimit],
        queryFn: () => (
            fetchKlines({
                symbols,
                interval,
                limit: timeframesLimit,
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
            assetsKlines={ klines }
            limit={ assetsLimit }
            timeframeKey={ timeframeKey }
            onTimeframeChange={ setTimeframeKey }
            colorsMap={ colorsMap }
            isLoading={ isLoading }
        />
    );
};

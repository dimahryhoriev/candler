'use client'

import { useAssets } from "@/hooks/use-assets";
import { fetchKlines } from "@/lib/api/fetch-klines";
import { ColorsMap, createColorsMap } from "@/lib/charts/colors";
import { TimeframeKey, timeframesMap } from "@/lib/charts/timeframes";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { PerformanceChartLayout } from "./performance-chart-layout";

export function PerformanceChart({
    assetsType,
}: {
    assetsType: 'majors' | 'altcoins';
}) {
    const [timeframeKey, setTimeframeKey] = useState<TimeframeKey>('1M');

    const {
        interval,
        limit: timeframesLimit,
    } = timeframesMap[timeframeKey];

    const assetsLimit = assetsType === 'majors' ? 2 : 6;

    const { assets } = useAssets({
        limit: assetsLimit,
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
            assetKlines={ klines }
            limit={ assetsLimit }
            timeframeKey={ timeframeKey }
            onTimeframeChange={ setTimeframeKey }
            colorsMap={ colorsMap }
            isLoading={ isLoading }
        />
    );
};

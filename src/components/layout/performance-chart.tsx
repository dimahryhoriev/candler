import { useAssets } from "@/hooks/use-assets";
import { fetchKlines, IntervalKey } from "@/lib/fetch-klines";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { PerformanceChartLayout } from "./performance-chart-layout";

export type TimeframeKey =
    | '1D' | '1W' | '1M'
    | '3M' | '6M' | '1Y'
    | '5Y' | 'ALL';

const timeframeToIntervalMap: Record<TimeframeKey, IntervalKey> = {
    '1D': '5m', '1W': '30m', '1M': '2h', '3M': '8h',
    '6M': '12h', '1Y': '1d', '5Y': '1w', 'ALL': '1M',
};

export function PerformanceChart({
    assetsType,
    timeframeKey = '1D',
}: {
    assetsType: 'majors' | 'altcoins';
    timeframeKey?: TimeframeKey;
}) {
    const limit = 200;
    const interval = timeframeToIntervalMap[timeframeKey];

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

import { useAssets } from "@/hooks/use-assets";
import { fetchKlines } from "@/lib/fetch-klines";
import { useMemo } from "react";
import { PerformanceChartLayout } from "./performance-chart-layout";

export type Timeframe =
    | '1D' | '1W' | '1M'
    | '3M' | '6M' | '1Y'
    | '5Y' | 'ALL';

export function PerformanceChart({
    assetsType,
    timeframe = '1D',
}: {
    assetsType: 'majors' | 'altcoins';
    timeframe?: Timeframe;
}) {
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

    const klines = fetchKlines({
        symbols,
    })

    return (
        <PerformanceChartLayout
            title={
                assetsType === 'majors'
                    ? 'Majors Performance'
                    : 'Altcoins Performance'
            }
            timeframe={ timeframe }
        />
    );
};

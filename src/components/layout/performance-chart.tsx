import { AssetsTypeOptions, sortAssets } from "@/lib/assets";
import { PerformanceChartLayout } from "./performance-chart-layout";

export type Timeframe =
    | '1D'
    | '1W'
    | '1M'
    | '3M'
    | '6M'
    | '1Y'
    | '5Y'
    | 'ALL';

export function PerformanceChart({
    assetsType,
    timeframe = '1D',
}: {
    assetsType: AssetsTypeOptions;
    timeframe?: Timeframe;
}) {
    const majors = ['BTC', 'ETH'];
    const altcoins = sortAssets();

    return (
        <PerformanceChartLayout
            title={
                assetsType === 'majors'
                    ? 'Majors Performance'
                    : 'Altcoins Performance'
            }
            symbols={
                assetsType === 'majors'
                    ?
            }
            timeframe={ timeframe }
        />
    );
};

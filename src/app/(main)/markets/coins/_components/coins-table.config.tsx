import { calculateAverageTradeSize } from "@/lib/assets/assets-calculations";
import { calculateChangePercent } from "@/lib/math/change";
import { useFuturesTickersStore } from "@/store/use-futures-tickers-store";
import { useSpotTickersStore } from "@/store/use-spot-tickers-store";
import { ArrowUp } from "lucide-react";
import { CoinsTableMarket, CoinsTableTab } from "./coins-table";
import { CoinsTableAssetCell } from "./coins-table-cells/coins-table-asset-cell";
import { CoinsTableAvgTradeSizeCell } from "./coins-table-cells/coins-table-avg-trade-size-cell";
import { CoinsTableCategoryCell } from "./coins-table-cells/coins-table-category-cell";
import { CoinsTableChangeCell } from "./coins-table-cells/coins-table-change-sell";
import { CoinsTableRankCell } from "./coins-table-cells/coins-table-rank-cell";
import { CoinsTableVolumeCell } from "./coins-table-cells/coins-table-volume-cell";
import { CoinsTablePriceCell } from "./coins-table-cells/coints-table-price-cell";
import { CoinsTableTradesCountCell } from "./coins-table-cells/coints-table-trades-count-cell";

export const markets = {
    futures: {
        useTotalCount: () => useFuturesTickersStore(
            s => s.totalCount
        ),
        useTickerPrice: (symbol: string) => useFuturesTickersStore(
            s => s.tickers[symbol].c
        ),
        useChange: (symbol: string) => useFuturesTickersStore(
            s => calculateChangePercent({
                openValue: Number(s.tickers[symbol]?.o),
                closeValue: Number(s.tickers[symbol]?.c),
            })
        ),
        useVolume: (symbol: string) => useFuturesTickersStore(
            s => s.tickers[symbol].q
        ),
        useTradesCount: (symbol: string) => useFuturesTickersStore(
            s => s.tickers[symbol].n
        ),
        useAverageTradeSize: (symbol: string) => useFuturesTickersStore(
            s => calculateAverageTradeSize({
                quoteVolume: Number(s.tickers[symbol].q),
                tradesCount: s.tickers[symbol].n
            })
        ),
    },
    spot: {
        useTotalCount: () => useSpotTickersStore(
            s => s.totalCount
        ),
        useTickerPrice: (symbol: string) => useSpotTickersStore(
            s => s.tickers[symbol].c
        ),
        useChange: (symbol: string) => useSpotTickersStore(
            s => calculateChangePercent({
                openValue: Number(s.tickers[symbol]?.o),
                closeValue: Number(s.tickers[symbol]?.c),
            })
        ),
        useVolume: (symbol: string) => useSpotTickersStore(
            s => s.tickers[symbol].q
        ),
        useTradesCount: (symbol: string) => useFuturesTickersStore(
            s => s.tickers[symbol].n
        ),
        useAverageTradeSize: (symbol: string) => useFuturesTickersStore(
            s => calculateAverageTradeSize({
                quoteVolume: Number(s.tickers[symbol].q),
                tradesCount: s.tickers[symbol].n
            })
        ),
    },
};

type ColumnKey =
    'asset' | 'rank' | 'price' | 'category' | 'change-1d' |
    'change-1w' | 'change-1m' | 'change-3m' | 'change-6m' |
    'change-1y' | 'change-5y' | 'change-all' | 'volume-24h' |
    'trades-count-24h' | 'avg-trades-size-24h';

export interface Column {
    key: ColumnKey;
    label: string;
    icon?: React.ReactNode;
    render: (params: {
        symbol: string | undefined,
        index: number,
        key: ColumnKey,
        market: CoinsTableMarket,
    }) => React.ReactNode;
};

export const baseColumns: Column[] = [
    {
        key: "asset",
        label: "Asset",
        render: ({ symbol, key }) => <CoinsTableAssetCell key={ key } symbol={ symbol } />
    },
    {
        key: "rank",
        label: "Rank",
        icon: <ArrowUp size={ 16 } />,
        render: ({ index, key }) => <CoinsTableRankCell key={ key } index={ index } />
    },
    {
        key: "price",
        label: "Price",
        render: ({ symbol, key, market }) => <CoinsTablePriceCell key={ key } symbol={ symbol } market={ market } />,
    },
    {
        key: "change-1d",
        label: "Change % 24h",
        render: ({ symbol, key, market }) => <CoinsTableChangeCell key={ key } symbol={ symbol } market={ market } timeframeKey="1D" />,
    },
];

export const tabColumns: Record<CoinsTableTab, Column[]> = {
    overview: [
        ...baseColumns,
        {
            key: "volume-24h",
            label: "Volume (24h)",
            render: ({ symbol, key, market }) => <CoinsTableVolumeCell key={ key } symbol={ symbol } market={ market } />,
        },
        {
            key: "category",
            label: "Category",
            render: ({ symbol, key }) => <CoinsTableCategoryCell key={ key } symbol={ symbol } />,
        }
    ],
    futures: [
        ...baseColumns,
        {
            key: "volume-24h",
            label: "Volume (24h)",
            render: ({ symbol, key, market }) => <CoinsTableVolumeCell key={ key } symbol={ symbol } market={ market } />,
        },
        {
            key: "trades-count-24h",
            label: "Trades Count (24h)",
            render: ({ symbol, key, market }) => <CoinsTableTradesCountCell key={ key } symbol={ symbol } market={ market } />,
        },
        {
            key: "avg-trades-size-24h",
            label: "Avg Trade Size (24h)",
            render: ({ symbol, key, market }) => <CoinsTableAvgTradeSizeCell key={ key } symbol={ symbol } market={ market } />,
        },
    ],
    performance: [
        ...baseColumns,
        {
            key: "change-1w",
            label: "Change % 1W",
            render: ({ symbol, key }) => <CoinsTableChangeCell key={ key } symbol={ symbol } timeframeKey="1W" />,
        },
        {
            key: "change-1m",
            label: "Change % 1M",
            render: ({ symbol, key }) => <CoinsTableChangeCell key={ key } symbol={ symbol } timeframeKey="1M" />,
        },
        {
            key: "change-3m",
            label: "Change % 3M",
            render: ({ symbol, key }) => <CoinsTableChangeCell key={ key } symbol={ symbol } timeframeKey="3M" />,
        },
        {
            key: "change-6m",
            label: "Change % 6M",
            render: ({ symbol, key }) => <CoinsTableChangeCell key={ key } symbol={ symbol } timeframeKey="6M" />,
        },
        {
            key: "change-1y",
            label: "Change % 1Y",
            render: ({ symbol, key }) => <CoinsTableChangeCell key={ key } symbol={ symbol } timeframeKey="1Y" />,
        },
        {
            key: "change-5y",
            label: "Change % 5Y",
            render: ({ symbol, key }) => <CoinsTableChangeCell key={ key } symbol={ symbol } timeframeKey="5Y" />,
        },
        {
            key: "change-all",
            label: "Change % All Time",
            render: ({ symbol, key }) => <CoinsTableChangeCell key={ key } symbol={ symbol } timeframeKey="ALL" />,
        },
    ],
};

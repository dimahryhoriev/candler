import { ArrowUp } from "lucide-react";
import { Tab } from "./coins-table";
import { CoinsTableAssetCell } from "./coins-table-cells/coins-table-asset-cell";
import { CoinsTableChangeCell } from "./coins-table-cells/coins-table-change-sell";
import { CoinsTableRankCell } from "./coins-table-cells/coins-table-rank-cell";
import { CoinsTableVolumeCell } from "./coins-table-cells/coins-table-volume-cell";
import { CoinsTablePriceCell } from "./coins-table-cells/coints-table-price-cell";

export interface Column {
    key: string;
    label: string;
    icon?: React.ReactNode;
    render: (
        symbol: string | undefined,
        index: number,
    ) => React.ReactNode;
};

export const baseColumns: Column[] = [
    {
        key: "asset",
        label: "Asset",
        render: (symbol) => <CoinsTableAssetCell symbol={ symbol } />
    },
    {
        key: "rank",
        label: "Rank",
        icon: <ArrowUp size={ 16 } />,
        render: (_, index) => <CoinsTableRankCell index={ index } />
    },
    {
        key: "price",
        label: "Price",
        render: (symbol) => <CoinsTablePriceCell symbol={ symbol } />,
    },
    {
        key: "change-1d",
        label: "Change % 24h",
        render: (symbol) => <CoinsTableChangeCell symbol={ symbol } timeframeKey="1D" />,
    },
];

export const tabColumns: Record<Tab, Column[]> = {
    overview: [
        ...baseColumns,
        {
            key: "volume-24h",
            label: "Volume (24h)",
            render: (symbol) => <CoinsTableVolumeCell symbol={ symbol } />,
        }
    ],
    futures: [
        ...baseColumns,
        {
            key: "volume-24h",
            label: "Volume (24h)",
            render: (symbol) => <CoinsTableVolumeCell symbol={ symbol } />,
        }
    ],
    performance: [
        ...baseColumns,
        {
            key: "change-1w",
            label: "Change % 1W",
            render: (symbol) => <CoinsTableChangeCell symbol={ symbol } timeframeKey="1W" />,
        },
        {
            key: "change-1m",
            label: "Change % 1M",
            render: (symbol) => <CoinsTableChangeCell symbol={ symbol } timeframeKey="1M" />,
        },
        {
            key: "change-3m",
            label: "Change % 3M",
            render: (symbol) => <CoinsTableChangeCell symbol={ symbol } timeframeKey="3M" />,
        },
        {
            key: "change-6m",
            label: "Change % 6M",
            render: (symbol) => <CoinsTableChangeCell symbol={ symbol } timeframeKey="6M" />,
        },
        {
            key: "change-1y",
            label: "Change % 1Y",
            render: (symbol) => <CoinsTableChangeCell symbol={ symbol } timeframeKey="1Y" />,
        },
        {
            key: "change-5y",
            label: "Change % 5Y",
            render: (symbol) => <CoinsTableChangeCell symbol={ symbol } timeframeKey="5Y" />,
        },
        {
            key: "change-all",
            label: "Change % All Time",
            render: (symbol) => <CoinsTableChangeCell symbol={ symbol } timeframeKey="ALL" />,
        },
    ],
};;

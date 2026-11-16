import { ArrowUp } from "lucide-react";
import { Tab } from "./coins-table";

export interface Column {
    key: string;
    label: string;
    icon?: React.ReactNode;
};

export const baseColumns: Column[] = [
    { key: "asset", label: "Asset" },
    { key: "rank", label: "Rank", icon: <ArrowUp size={ 16 } /> },
    { key: "price", label: "Price" },
    { key: "change-1d", label: "Change % 24h" },
];

export const tabColumns: Record<Tab, Column[]> = {
    overview: [
        ...baseColumns,
        { key: "market-cap", label: "Market Cap" }
    ],
    futures: [
        ...baseColumns,
        { key: "market-cap", label: "Market Cap" }
    ],
    performance: [
        ...baseColumns,
        { key: "change-1w", label: "Change % 1W" },
        { key: "change-1m", label: "Change % 1M" },
        { key: "change-3m", label: "Change % 3M" },
        { key: "change-6m", label: "Change % 6M" },
        { key: "change-1y", label: "Change % 1Y" },
        { key: "change-5y", label: "Change % 5Y" },
        { key: "change-all", label: "Change % All Time" },
    ],
};;

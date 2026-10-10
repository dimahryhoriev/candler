'use client'

import { useAssets } from "@/hooks/use-assets";
import { AssetSortOptions, SortOrder } from "@/lib/assets";
import { formatChange, formatNumber } from "@/lib/format";
import { calculateChangePercent } from "@/lib/math/change";
import { AssetsListCard } from "./assets-list-card";
import { AssetsListLayout } from "./assets-list-layout";
import { AssetsListRow } from "./assets-list-row";

export type AssetsListViewMode = 'cards' | 'rows';
export type AssetsListItem = {
    symbol: string;
    price: string;
    change: string;
    isPositive: boolean;
};

export type AssetsListParams = {
    title: string;
    mode: AssetsListViewMode;
    sortOption?: AssetSortOptions;
    sortOrder: SortOrder;
    limit: number;
};

export function AssetsList({
    title,
    mode,
    sortOption,
    sortOrder,
    limit,
}: AssetsListParams) {
    const { assets } = useAssets({
        limit,
        sortOption,
        sortOrder,
    });

    return (
        <AssetsListLayout
            title={ title }
            mode={ mode }
        >
            {
                assets.map(
                    (asset, index) => {
                        const openPrice = Number(asset?.o);
                        const closePrice = Number(asset?.c);
                        const changePercent = calculateChangePercent({
                            openValue: openPrice,
                            closeValue: closePrice,
                        });

                        const formattedSymbol = asset?.s ?? '--';
                        const formattedPrice = formatNumber(asset?.c);
                        const formattedChange = formatChange(changePercent);

                        return (
                            mode === 'cards'
                                ? (
                                    <AssetsListCard
                                        key={ asset?.s ?? index }
                                        symbol={ formattedSymbol }
                                        price={ formattedPrice }
                                        change={ formattedChange }
                                        isPositive={ changePercent >= 0 }
                                    />
                                )
                                : (
                                    <AssetsListRow
                                        key={ asset?.s ?? index }
                                        symbol={ formattedSymbol }
                                        price={ formattedPrice }
                                        change={ formattedChange }
                                        isPositive={ changePercent >= 0 }
                                    />
                                )
                        );
                    },
                )
            }
        </AssetsListLayout >
    )
};

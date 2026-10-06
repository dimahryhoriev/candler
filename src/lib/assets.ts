import { Asset } from "@/hooks/use-assets";
import { calculateChangePercent } from "./math";

export type AssetSortOptions = 'volume' | 'price' | 'change';
export type SortOrder = 'asc' | 'desc';

type SortAssetsParams = {
    assets: Asset[];
    sortOption?: AssetSortOptions;
    sortOrder: SortOrder;
    limit: number;
};

export function sortAssets({
    assets,
    sortOption = 'volume',
    sortOrder,
    limit,
}: SortAssetsParams) {
    const activeAssets = assets.filter(
        a => Number(a.q) > 0
    );

    return (
        filterAssetsByPair(activeAssets)
            .toSorted((a, b) => {
                const aValue = getAssetValue({
                    asset: a,
                    sortOption,
                });
                const bValue = getAssetValue({
                    asset: b,
                    sortOption,
                });

                return (
                    sortOrder === 'asc'
                        ? aValue - bValue
                        : bValue - aValue
                );
            })
            .slice(0, limit)
    );
};

function getAssetValue({
    asset,
    sortOption,
}: {
    asset: Asset;
    sortOption: AssetSortOptions;
}) {
    switch (sortOption) {
        case 'volume':
            return Number(asset.q)
        case 'price':
            return Number(asset.c)
        case 'change':
            return (
                calculateChangePercent({
                    openValue: Number(asset.o),
                    closeValue: Number(asset.c),
                })
            )
        default:
            return Number(asset.q)
    };
}

function filterAssetsByPair(
    assets: Asset[],
    quoteAsset: string = 'USDT',
) {
    if (!Array.isArray(assets)) return [];

    return (
        assets.filter((a) => (
            !!a
            &&
            a.s.endsWith(quoteAsset)
            &&
            !a.s.includes('UP')
            &&
            !a.s.includes('DOWN')
        ))
    );
};

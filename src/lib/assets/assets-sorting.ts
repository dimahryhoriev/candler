import { Asset } from "@/hooks/use-assets";
import { calculateChangePercent } from "../math/change";
import { filterAssetsByPair, filterAssetsByType } from "./assets-filters";
import { AssetsTypeOptions } from "./assets-types";

export type AssetSortOptions = 'volume' | 'price' | 'change';
export type SortOrder = 'asc' | 'desc';

type SortAssetsParams = {
    assets: Asset[];
    sortOption?: AssetSortOptions;
    sortOrder?: SortOrder;
    typeOptions?: AssetsTypeOptions;
    limit: number;
};

export function sortAssets({
    assets,
    sortOption = 'volume',
    sortOrder = 'asc',
    typeOptions = {
        stables: false,
        majors: true,
        altcoins: true,
    },
    limit,
}: SortAssetsParams) {
    const filteredPairs = filterAssetsByPair(assets);
    const filteredTypes = filterAssetsByType(
        filteredPairs,
        typeOptions,
    );

    return (
        filteredTypes
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

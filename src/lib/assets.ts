import { Asset } from "@/hooks/use-assets";
import { formatSymbol } from "./format";
import { calculateChangePercent } from "./math/change";

export type AssetSortOptions = 'volume' | 'price' | 'change';
export type SortOrder = 'asc' | 'desc';

export type AssetsTypeOptions = {
    stables?: boolean;
    majors?: boolean;
    altcoins?: boolean;
};

const majors = ['BTC', 'ETH'];
const stables = [
    'USDC', 'FDUSD', 'TUSD', 'USDP',
    'USDD', 'DAI', 'FRAX', 'PYUSD',
    'USDE', 'BUSD', 'EUR', 'AEUR',
    'EURI', 'TRY', 'BRL', 'GBP',
    'ARS', 'UAH', 'BIDR', 'ZAR',
];

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

function filterAssetsByType(
    assets: Asset[],
    type: AssetsTypeOptions,
) {
    if (!Array.isArray(assets)) return [];

    return (
        assets.filter((a) => {
            const symbol = formatSymbol(
                a.s,
                'upper',
            );

            if (
                type.stables === false
                &&
                stables.includes(symbol)
            ) return false;

            if (
                type.majors === false
                &&
                majors.includes(symbol)
            ) return false;

            if (
                type.altcoins === false
                &&
                (
                    !stables.includes(symbol)
                    &&
                    !majors.includes(symbol)
                )
            ) return false;

            return true;
        })
    );
};

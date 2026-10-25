import { Asset } from "@/hooks/use-assets";
import { AssetsTypeOptions, getAssetType } from "./assets-types";

export function filterAssetsByPair(
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

export function filterAssetsByType(
    assets: Asset[],
    type: AssetsTypeOptions,
) {
    if (!Array.isArray(assets)) return [];

    return (
        assets.filter((a) => {
            const assetType = getAssetType(a);

            if (
                type.stables === false
                &&
                assetType === 'stable'
            ) return false;

            if (
                type.majors === false
                &&
                assetType === 'major'
            ) return false;

            if (
                type.altcoins === false
                &&
                assetType === 'altcoin'
            ) return false;

            return true;
        })
    );
};

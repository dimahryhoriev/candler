import { Asset } from "@/hooks/use-assets";
import { formatSymbol } from "../format";
import { AssetsTypeOptions, majors, stables } from "./assets-types";

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

import { Asset } from "@/hooks/use-assets";
import { formatSymbol } from "../format";

export type AssetType = 'stable' | 'major' | 'altcoin';

export type AssetsTypeOptions = {
    stables?: boolean;
    majors?: boolean;
    altcoins?: boolean;
};

export function getAssetType(
    asset: Asset,
) {
    const symbol = formatSymbol(
        asset.s,
        'upper',
    );

    const isStable = (
        /^USD|USD$/i.test(symbol)
        ||
        stables.has(symbol)
        ||
        /^(EUR|GBP|TRY|BRL)|(EUR|GBP|TRY|BRL)$/i.test(symbol)
    );

    if (isStable) return 'stable';
    if (majors.has(symbol)) return 'major';
    return 'altcoin';
};

export const majors = new Set([
    'BTC', 'ETH',
]);

export const stables = new Set([
    'USDC', 'FDUSD', 'TUSD', 'USDP',
    'USDD', 'DAI', 'FRAX', 'PYUSD',
    'USDE', 'BUSD', 'EUR', 'AEUR',
    'EURI', 'TRY', 'BRL', 'GBP',
    'ARS', 'UAH', 'BIDR', 'ZAR',
    'USD1', 'RLUSD'
]);

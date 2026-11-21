import { formatSymbol } from "../format";

export type AssetType = 'stable' | 'major' | 'altcoin';

export type AssetsTypeOptions = {
    stables?: boolean;
    majors?: boolean;
    altcoins?: boolean;
};

export function getAssetType(
    symbol: string,
) {
    const formattedSymbol = formatSymbol(
        symbol,
        'upper',
    );

    const isStable = (
        /^USD|USD$/i.test(formattedSymbol)
        ||
        stables.has(formattedSymbol)
        ||
        /^(EUR|GBP|TRY|BRL)|(EUR|GBP|TRY|BRL)$/i.test(formattedSymbol)
    );

    if (isStable) return 'stable';
    if (majors.has(formattedSymbol)) return 'major';
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
    'USD1', 'RLUSD', 'U'
]);

import { AssetKlines } from "../api/fetch-klines";

export type AssetChanges = {
    symbol: string;
    changes: {
        openTime: number;
        closeTime: number;
        change: number;
    }[];
};

export function calculateAssetsChanges(
    assetKlines: AssetKlines[],
): AssetChanges[] {
    return assetKlines.map(
        (asset) => {
            const openPrice = asset.klines[0]?.openPrice;
            if (!openPrice) return {
                symbol: asset.symbol,
                changes: [],
            };

            return {
                symbol: asset.symbol,
                changes:
                    asset.klines.map(
                        (k) => ({
                            openTime: k.openTime,
                            closeTime: k.closeTime,
                            change: (
                                ((k.closePrice - openPrice) / openPrice)
                                *
                                100
                            )
                        })
                    )
            };
        },
    );
};

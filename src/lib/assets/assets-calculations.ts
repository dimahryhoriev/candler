import { AssetKlines } from "../api/fetch-klines";
import { ChangeBounds, scaleChangeToPoint } from "../math/change";
import { Point } from "../math/point";

export type AssetChanges = {
    symbol: string;
    changes: {
        openTime: number;
        closeTime: number;
        change: number;
    }[];
};

export type AssetPoints = {
    symbol: string;
    points: Point[];
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

export function scaleAssetsChangesToPoints(
    assetsChanges: AssetChanges[],
    changeBounds: ChangeBounds,
): AssetPoints[] {
    return (
        assetsChanges
            .sort((a, b) => {
                const maxA = Math.max(...a.changes.map(c => c.change));
                const maxB = Math.max(...b.changes.map(c => c.change));
                return maxB - maxA;
            })
            .map((asset) => {
                const points = asset.changes.map((c, index) => (
                    scaleChangeToPoint({
                        changeBounds,
                        currChange: c.change,
                        currTime: index === 0
                            ? c.openTime
                            : c.closeTime,
                    })
                ))

                return {
                    symbol: asset.symbol,
                    points,
                };
            })
    );
};

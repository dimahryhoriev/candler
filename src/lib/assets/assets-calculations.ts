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

export type AssetArea = Record<string, number>;

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
    const areas = scaleAssetsChangesToArea(
        assetsChanges,
        changeBounds,
    );

    return (
        assetsChanges
            .sort((a, b) => {
                const maxA = areas[a.symbol];
                const maxB = areas[b.symbol];
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

export function scaleAssetsChangesToArea(
    assetsChanges: AssetChanges[],
    changeBounds: ChangeBounds,
): AssetArea {
    const min = changeBounds.change.min;

    return (
        Object.fromEntries(
            assetsChanges.map(
                (asset) => {
                    const area = asset.changes.reduce(
                        (acc, curr) => acc + (curr.change - min),
                        0,
                    );

                    return [
                        asset.symbol,
                        area,
                    ];
                },
            )
        )
    );
};

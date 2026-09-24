'use client';

import { useAssets } from "@/hooks/use-assets";
import { TopAssetsItem } from "./top-assets-item";

export function TopAssets() {
    const { assets } = useAssets({
        limit: 3,
    });

    return (
        <div className="hidden md:flex items-center gap-6 text-xs">
            {
                assets.map(
                    (asset) => {
                        const openPrice = Number(asset.o);
                        const closePrice = Number(asset.c);
                        const changePercent = (
                            openPrice > 0
                                ? ((closePrice - openPrice) / openPrice) * 100
                                : 0
                        );
                        const formattedChange =
                            `${changePercent > 0 ? '+' : ''}${changePercent.toFixed(2)}%`

                        return (
                            <TopAssetsItem
                                key={ asset.s }
                                symbol={ asset.s }
                                price={ asset.c }
                                change={ formattedChange }
                                isPositive={ changePercent >= 0 }
                            />
                        );
                    }
                )
            }
        </div>
    );
};

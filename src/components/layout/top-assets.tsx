'use client';

import { useAssets } from "@/hooks/use-assets";
import { formatChange, formatPrice } from "@/lib/format";
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

                        const formattedPrice = formatPrice(asset.c);
                        const formattedChange = formatChange(changePercent);

                        return (
                            <TopAssetsItem
                                key={ asset.s }
                                symbol={ asset.s }
                                price={ formattedPrice }
                                change={ formattedChange }
                                isPositive={ changePercent >= 0 }
                            />
                        );
                    },
                )
            }
        </div>
    );
};

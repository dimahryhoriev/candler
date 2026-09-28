'use client';

import { useAssets } from "@/hooks/use-assets";
import { formatChange, formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export function TopAssets() {
    const limit = 3;
    const { assets } = useAssets({
        limit,
    });

    return (
        <div className="hidden md:flex items-center gap-6 text-xs">
            {
                assets.map(
                    (asset, index) => {
                        const openPrice = Number(asset?.o);
                        const closePrice = Number(asset?.c);
                        const changePercent = (
                            openPrice > 0
                                ? ((closePrice - openPrice) / openPrice) * 100
                                : 0
                        );

                        const formattedSymbol = asset?.s ?? '--';
                        const formattedPrice = formatPrice(asset?.c);
                        const formattedChange = formatChange(changePercent);

                        return (
                            <TopAssetsItem
                                key={ asset?.s ?? index }
                                symbol={ formattedSymbol }
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

export type TopAssetsItemProps = {
    symbol: string;
    price: string;
    change: string;
    isPositive: boolean;
};

export function TopAssetsItem({
    symbol,
    price,
    change,
    isPositive,
}: TopAssetsItemProps) {
    return (
        <div className="flex items-center gap-1.5">
            <span className="font-semibold text-muted-foreground">
                { symbol }
            </span>
            <span className="font-mono font-medium">
                { price }
            </span>
            <span
                className={
                    cn(
                        "font-mono font-medium",
                        isPositive
                            ? "text-emerald-500"
                            : "text-rose-500"
                    )
                }
            >
                { change }
            </span>
        </div>
    );
};

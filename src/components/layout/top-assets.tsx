'use client';

import { useAssets } from "@/hooks/use-assets";
import { formatChange, formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { SkeletonGroup } from "../ui/skeleton-group";

export function TopAssets() {
    const { assets } = useAssets({
        limit: 3,
    });

    return (
        assets.length !== 0
            ? (
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
            )
            : <SkeletonGroup itemsCount={ 3 } />
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

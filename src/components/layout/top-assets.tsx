'use client';

import { useAssets } from "@/hooks/use-assets";
import { formatChange, formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { AssetIcon } from "../ui/asset-icon";

export function TopAssets() {
    const { assets } = useAssets({
        limit: 4,
    });

    return (
        <div
            className="
                hidden md:flex items-center
                text-xs p-4 gap-6
            "
        >
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
        <button
            className="
                border rounded-xl hover:cursor-pointer
                transition-colors duration-100 flex
                bg-background hover:bg-secondary p-4
                w-full gap-2
            "
        >
            <AssetIcon
                symbol={ symbol }
                variant='color'
            />
            <div
                className="
                    flex flex-col w-full gap-1 items-start
                    text-base
                "
            >
                <span className="font-semibold text-muted-foreground">
                    { symbol }
                </span>
                <div className="flex flex-row items-center gap-1.5">
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
            </div>
        </button>
    );
};

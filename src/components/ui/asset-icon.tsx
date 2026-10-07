import { formatSymbol } from "@/lib/format";
import { cn } from "@/lib/utils";
import { CircleDollarSign } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const ICON_BASE_URL = process.env.NEXT_PUBLIC_CRYPTO_ICONS_BASE_URL;

type AssetIconVariant = 'color' | 'mono';

export function AssetIcon({
    symbol,
    variant,
}: {
    symbol: string;
    variant: AssetIconVariant;
}) {
    const formattedSymbol = formatSymbol(
        symbol,
        'upper'
    );
    const [hasError, setHasError] = useState<boolean>(
        false
    );

    if (hasError || formattedSymbol === '') {
        return (
            <AssetIconPlaceholder />
        );
    };

    const ICON_URL = `${ICON_BASE_URL}${formattedSymbol}.svg`;

    return (
        <div
            className={
                cn(
                    'w-8 h-8 relative shrink-0',
                    'overflow-hidden rounded-full',
                    variant === 'mono'
                    &&
                    'grayscale contrast-125 opacity-80'
                )
            }
        >
            <Image
                fill
                src={ ICON_URL }
                alt={ symbol }
                unoptimized
                onError={ () => setHasError(true) }
            />
        </div>
    )
};

export function AssetIconPlaceholder() {
    return (
        <div
            className="
                    bg-muted w-8 h-8 shrink-0
                    rounded-full flex items-center
                    justify-center
                "
        >
            <CircleDollarSign />
        </div>
    );
};

import { formatSymbol } from "@/lib/format";
import { CircleDollarSign } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const ICON_BASE_URL = process.env.NEXT_PUBLIC_CRYPTO_ICONS_BASE_URL;

type AssetIconVariant = 'color' | 'white' | 'black' | 'icon';

export function AssetIcon({
    symbol,
    variant,
}: {
    symbol: string;
    variant: AssetIconVariant;
}) {
    const formattedSymbol = formatSymbol(
        symbol,
        'lower'
    );
    const [hasError, setHasError] = useState<boolean>(
        false
    );

    if (hasError || formattedSymbol === '') {
        return (
            <AssetIconPlaceholder />
        );
    };

    const ICON_URL = `${ICON_BASE_URL}/${variant}/${formattedSymbol}.svg`;

    return (
        <div
            className="
                w-8 h-8 relative shrink-0
                overflow-hidden rounded-full
            "
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

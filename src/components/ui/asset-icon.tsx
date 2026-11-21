import { formatSymbol } from "@/lib/format";
import { cn } from "@/lib/utils";
import { CircleDollarSign } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const ICON_BASE_URL = process.env.NEXT_PUBLIC_CRYPTO_ICONS_BASE_URL;

type AssetIconVariant = 'color' | 'mono';

export function AssetIcon({
    symbol,
    size = 'md',
    variant,
}: {
    symbol?: string;
    size?: 'sm' | 'md' | 'lg';
    variant: AssetIconVariant;
}) {
    const [hasError, setHasError] = useState<boolean>(false);

    const formattedSymbol = symbol
        ? formatSymbol(
            symbol,
            'upper'
        )
        : '';

    const sizeClass = (
        (size === 'sm' && 'w-6 h-6') ||
        (size === 'md' && 'w-8 h-8') ||
        (size === 'lg' && 'w-10 h-10')
    );

    if (!symbol || hasError || formattedSymbol === '') {
        return (
            <AssetIconPlaceholder
                className={ sizeClass as string }
            />
        );
    };

    const ICON_URL = `${ICON_BASE_URL}${formattedSymbol}.svg`;

    return (
        <div
            className={
                cn(
                    'relative shrink-0',
                    'overflow-hidden rounded-full',
                    sizeClass,
                    variant === 'mono'
                    &&
                    'grayscale contrast-125 opacity-80',
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
    );
};

export function AssetIconPlaceholder({
    className,
}: {
    className?: string;
}) {
    return (
        <div
            className={
                cn(
                    'bg-muted w-8 h-8 shrink-0',
                    'rounded-full flex items-center',
                    'justify-center',
                    className,
                )
            }
        >
            <CircleDollarSign />
        </div>
    );
};

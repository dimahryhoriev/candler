'use client'

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

type EdgeFadeSide = 'left' | 'right' | 'top' | 'bottom';
type EdgeFadeSize = 'sm' | 'md' | 'lg';

interface EdgeFadeParams {
    side?: EdgeFadeSide;
    size?: EdgeFadeSize;
    isVisible: boolean;
    className?: string;
}

const edgeFadeVariants = cva(
    'pointer-events-none absolute transition-opacity duration-200',
    {
        variants: {
            side: {
                top: "inset-x-0 top-0 bg-gradient-to-b from-black/[0.08] to-transparent",
                bottom: "inset-x-0 bottom-0 bg-gradient-to-t from-black/[0.08] to-transparent",
                left: "inset-y-0 left-0 bg-gradient-to-r from-black/[0.08] to-transparent",
                right: "inset-y-0 right-0 bg-gradient-to-l from-black/[0.08] to-transparent",
            },
            size: {
                sm: '',
                md: '',
                lg: '',
            },
            isVisible: {
                true: 'opacity-100',
                false: 'opacity-0',
            },
        },
        compoundVariants: [
            { side: ["top", "bottom"], size: "sm", class: "h-1" },
            { side: ["top", "bottom"], size: "md", class: "h-2" },
            { side: ["top", "bottom"], size: "lg", class: "h-3" },
            { side: ["left", "right"], size: "sm", class: "w-1" },
            { side: ["left", "right"], size: "md", class: "w-2" },
            { side: ["left", "right"], size: "lg", class: "w-3" },
        ],
        defaultVariants: {
            side: 'right',
            size: 'md',
            isVisible: true,
        },
    },
);

export function EdgeFade({
    side,
    size,
    isVisible,
    className,
}: EdgeFadeParams) {
    return (
        <div
            className={
                cn(
                    edgeFadeVariants({
                        side,
                        size,
                        isVisible,
                    }),
                    className,
                )
            }
        />
    );
}

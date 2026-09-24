import { cn } from "@/lib/utils";

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

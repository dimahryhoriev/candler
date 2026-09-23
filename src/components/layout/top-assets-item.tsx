import { cn } from "@/lib/utils";

export type TopAssetsItemProps = {
    asset: string;
    price: string;
    change: string;
    isPositive: boolean;
};

export function TopAssetsItem({
    asset,
    price,
    change,
    isPositive,
}: TopAssetsItemProps) {
    return (
        <div className="flex items-center gap-1.5">
            <span className="font-semibold text-muted-foreground">
                { asset }
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

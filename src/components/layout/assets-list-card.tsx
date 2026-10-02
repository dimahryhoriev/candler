import { cn } from "@/lib/utils";
import { AssetIcon } from "../ui/asset-icon";
import { AssetsListItem } from "./assets-list";

export function AssetsListCard({
    symbol,
    price,
    change,
    isPositive,
}: AssetsListItem) {
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
                        ${ price }
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

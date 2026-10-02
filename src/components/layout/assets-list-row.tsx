import { cn } from "@/lib/utils";
import { AssetIcon } from "../ui/asset-icon";
import { AssetsListItem } from "./assets-list";

export function AssetsListRow({
    symbol,
    price,
    change,
    isPositive,
}: AssetsListItem) {
    return (
        <button
            className="
                rounded-lg hover:cursor-pointer
                transition-colors duration-100 flex
                bg-background hover:bg-secondary p-3
                w-full gap-2
            "
        >
            <AssetIcon
                symbol={ symbol }
                variant='color'
            />
            <div
                className="
                    flex w-full gap-1 items-start
                    text-base justify-between
                "
            >
                <span className="font-semibold text-muted-foreground">
                    { symbol }
                </span>
                <div
                    className="
                        flex items-center gap-12
                    "
                >
                    <span className="font-mono font-medium">
                        ${ price }
                    </span>
                    <div
                        className={
                            cn(
                                "font-mono font-medium text-white",
                                'p-2 rounded-md',
                                isPositive
                                    ? "bg-emerald-500"
                                    : "bg-rose-500"
                            )
                        }
                    >
                        { change }
                    </div>
                </div>
            </div>
        </button>
    );
};

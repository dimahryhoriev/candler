import { AssetIcon } from "@/components/ui/asset-icon";
import { TableCell } from "@/components/ui/table";
import { formatSymbol } from "@/lib/format";

export function CoinsTableAssetCell({
    symbol,
}: {
    symbol?: string;
}) {
    return (
        <TableCell
            className="
                sticky left-0 text-left
                w-60 min-w-60 max-w-60
                transition-shadow duration-200
                group-data-[scrolled-x=true]/table:shadow-md
            "
        >
            <div className="flex items-center gap-3">
                <AssetIcon
                    symbol={ symbol }
                    size="sm"
                    variant="color"
                />
                <div
                    className="
                        px-4 py-1 bg-muted rounded-md font-medium
                        text-xs font-mono group-hover/row:bg-blue-500
                        group-hover/row:text-white group-hover/row:font-bold
                        transition-all duration-200 cursor-pointer
                    "
                >
                    {
                        symbol
                            ? formatSymbol(symbol, 'upper')
                            : '--'
                    }
                </div>
            </div>
        </TableCell>
    );
};

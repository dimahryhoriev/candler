import { TableCell } from "@/components/ui/table";
import { formatSymbol } from "@/lib/format";

export function CoinsTableAssetCell({
    symbol,
}: {
    symbol?: string;
}) {
    return (
        <TableCell>
            {
                symbol
                    ? formatSymbol(symbol, 'upper')
                    : '--'
            }
        </TableCell>
    );
};

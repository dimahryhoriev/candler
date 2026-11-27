import { TableCell } from "@/components/ui/table";
import { formatNumber } from "@/lib/format";
import { CoinsTableMarket } from "../coins-table";
import { markets } from "../coins-table.config";

export function CoinsTableAvgTradeSizeCell({
    symbol,
    market,
}: {
    symbol?: string;
    market: CoinsTableMarket;
}) {
    const averageTradeSize = symbol
        ? markets[market].useAverageTradeSize(symbol)
        : undefined;

    return (
        <TableCell className="font-mono">
            ${ formatNumber({ number: String(averageTradeSize), decimals: false }) }
        </TableCell>
    );
}

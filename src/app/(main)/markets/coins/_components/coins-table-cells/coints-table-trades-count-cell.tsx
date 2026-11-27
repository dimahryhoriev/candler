import { TableCell } from "@/components/ui/table";
import { formatNumber } from "@/lib/format";
import { CoinsTableMarket } from "../coins-table";
import { markets } from "../coins-table.config";

export function CoinsTableTradesCountCell({
    symbol,
    market,
}: {
    symbol?: string;
    market: CoinsTableMarket;
}) {
    const tradesCount = symbol
        ? markets[market].useTradesCount(symbol)
        : undefined;

    return (
        <TableCell className="font-mono">
            { formatNumber({ number: String(tradesCount), decimals: false }) }
        </TableCell>
    );
};

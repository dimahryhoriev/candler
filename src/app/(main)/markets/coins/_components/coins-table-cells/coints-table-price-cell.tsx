import { TableCell } from "@/components/ui/table";
import { formatNumber } from "@/lib/format";
import { CoinsTableMarket } from "../coins-table";
import { markets } from "../coins-table.config";

export function CoinsTablePriceCell({
    symbol,
    market,
}: {
    symbol?: string;
    market: CoinsTableMarket;
}) {
    const price = symbol
        ? markets[market].useTickerPrice(symbol)
        : undefined;

    return (
        <TableCell className="font-mono">
            ${ formatNumber({ number: price }) }
        </TableCell>
    );
};

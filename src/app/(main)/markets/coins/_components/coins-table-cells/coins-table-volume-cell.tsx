import { TableCell } from "@/components/ui/table";
import { formatNumber } from "@/lib/format";
import { CoinsTableMarket } from "../coins-table";
import { markets } from "../coins-table.config";

export function CoinsTableVolumeCell({
    symbol,
    market,
}: {
    symbol?: string;
    market: CoinsTableMarket;
}) {
    const volume = symbol
        ? markets[market].useVolume(symbol)
        : undefined;

    return (
        <TableCell>
            { formatNumber({ number: volume, notation: 'compact' }) }
        </TableCell>
    );
};

import { TableCell } from "@/components/ui/table";
import { formatNumber } from "@/lib/format";
import { useSpotTickersStore } from "@/store/use-spot-tickers-store";

export function CoinsTableVolumeCell({
    symbol,
}: {
    symbol?: string;
}) {
    const volume = useSpotTickersStore((state) => (
        symbol
            ? state.tickers[symbol]?.q
            : undefined
    ));

    return (
        <TableCell>
            { formatNumber(volume, 'compact') }
        </TableCell>
    );
};

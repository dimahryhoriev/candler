import { Asset } from "@/hooks/use-assets";
import { Tab } from "./coins-table";
import { TableRow } from "@/components/ui/table";

type CoinsTableRowProps = {
    asset: Asset;
    tab: Tab;
};

export function CoinsTableRow({
    asset,
    tab,
}: CoinsTableRowProps) {
    return (
        <TableRow>
            TableCell
        </TableRow>
    )
};

import { TableCell } from "@/components/ui/table";
import { getAssetType } from "@/lib/assets/assets-types";
import { capitalizeString } from "@/lib/format";

export function CoinsTableCategoryCell({
    symbol,
}: {
    symbol?: string;
}) {
    if (!symbol) {
        return (
            <TableCell>--</TableCell>
        );
    };

    const category = getAssetType(symbol);

    return (
        <TableCell>
            {
                capitalizeString(category)
            }
        </TableCell>
    );
};

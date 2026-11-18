import { TableBody, TableRow } from "@/components/ui/table";
import { Asset } from "@/hooks/use-assets";
import { Tab } from "./coins-table";
import { tabColumns } from "./coins-table.config";

type CoinsTableBodyParams = {
    assets: (Asset | undefined)[];
    symbols: string[];
    tab: Tab;
}

export function CoinsTableBody({
    assets,
    tab,
}: CoinsTableBodyParams) {
    return (
        <TableBody>
            {
                assets.map((a, i) => (
                    <TableRow key={ i }>
                        {
                            tabColumns[tab].map((tc) => (
                                tc.render(a?.s, i)
                            ))
                        }
                    </TableRow>
                ))
            }
        </TableBody>
    );
};

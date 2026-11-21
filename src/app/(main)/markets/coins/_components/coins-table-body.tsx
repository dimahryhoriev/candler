import { TableBody, TableRow } from "@/components/ui/table";
import { Asset } from "@/hooks/use-assets";
import { useTimeframesChangesStore } from "@/store/use-timeframes-changes-store";
import { useEffect } from "react";
import { Tab } from "./coins-table";
import { tabColumns } from "./coins-table.config";

type CoinsTableBodyParams = {
    assets: (Asset | undefined)[];
    symbols: string[];
    tab: Tab;
}

export function CoinsTableBody({
    assets,
    symbols,
    tab,
}: CoinsTableBodyParams) {
    const loadChanges = useTimeframesChangesStore(s => s.loadChanges);

    useEffect(() => {
        loadChanges(symbols);
    }, [loadChanges, symbols])

    return (
        <TableBody>
            {
                assets.map((a, i) => (
                    <TableRow
                        key={ a?.s ?? i }
                        className="
                            group/row text-right [&>td]:bg-background
                            hover:[&>td]:bg-muted [&>td]:py-3
                            [&>td]:transition-colors [&>td]:duration-200
                        "
                    >
                        {
                            tabColumns[tab].map((tc) => (
                                tc.render({
                                    symbol: a?.s,
                                    index: i,
                                    key: tc.key
                                })
                            ))
                        }
                    </TableRow>
                ))
            }
        </TableBody>
    );
};

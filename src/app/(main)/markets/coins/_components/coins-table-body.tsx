import { TableBody, TableRow } from "@/components/ui/table";
import { FuturesAsset } from "@/store/use-futures-tickers-store";
import { SpotAsset } from "@/store/use-spot-tickers-store";
import { CoinsTableMarket, CoinsTableTab } from "./coins-table";
import { tabColumns } from "./coins-table.config";

type CoinsTableBodyParams = {
    assets: (SpotAsset | FuturesAsset | undefined)[];
    tab: CoinsTableTab;
    market: CoinsTableMarket;
};

export function CoinsTableBody({
    assets,
    tab,
    market,
}: CoinsTableBodyParams) {
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
                                    key: tc.key,
                                    market,
                                })
                            ))
                        }
                    </TableRow>
                ))
            }
        </TableBody>
    );
};

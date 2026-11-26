import { sortAssets } from "@/lib/assets/assets-sorting";
import { useFuturesTickersStore } from "@/store/use-futures-tickers-store";
import { useEffect, useMemo } from "react";
import { UseAssetsParams } from "./use-assets.types";

export function useFuturesAssets({
    limit = 5,
    sortOption = 'volume',
    sortOrder = 'desc',
    typeOptions = {
        stables: false,
        majors: true,
        altcoins: true,
    },
}: UseAssetsParams) {
    const isInitialized = useFuturesTickersStore(s => s.isInitialized);
    const initTickers = useFuturesTickersStore(s => s.init);
    const isConnected = useFuturesTickersStore(s => s.isConnected);
    const disconnect = useFuturesTickersStore(s => s.disconnect);
    const tickers = useFuturesTickersStore(s => s.tickers);

    useEffect(() => {
        if (!isInitialized) initTickers();
    }, [
        isInitialized,
        initTickers,
    ]);

    const assets = useMemo(() => {
        const tickersList = Object.values(tickers);

        if (tickersList.length === 0) {
            return Array.from(
                {
                    length: limit,
                },
                () => undefined,
            );
        };

        return sortAssets({
            assets: tickersList,
            sortOption,
            sortOrder,
            typeOptions,
            limit,
        });
    }, [
        tickers,
        sortOption,
        sortOrder,
        typeOptions,
        limit,
    ]);

    return {
        assets,
        isConnected,
        disconnect,
    };
};

import { sortAssets } from "@/lib/assets/assets-sorting";
import { useSpotTickersStore } from "@/store/use-spot-tickers-store";
import { useEffect, useMemo } from "react";
import { UseAssetsParams } from "./use-assets.types";

export function useSpotAssets({
    limit = 5,
    sortOption = 'volume',
    sortOrder = 'desc',
    typeOptions = {
        stables: false,
        majors: true,
        altcoins: true,
    },
}: UseAssetsParams) {
    const isInitialized = useSpotTickersStore(s => s.isInitialized);
    const initTickers = useSpotTickersStore(s => s.init);
    const isConnected = useSpotTickersStore(s => s.isConnected);
    const disconnect = useSpotTickersStore(s => s.disconnect);
    const tickers = useSpotTickersStore(s => s.tickers);

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

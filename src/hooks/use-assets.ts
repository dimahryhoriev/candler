'use client'

import { ApiSchemas } from "@/api";
import { AssetSortOptions, sortAssets, SortOrder } from "@/lib/assets";
import { useTickersStore } from "@/store/use-tickers-store";
import { useEffect, useMemo, useRef, useState } from "react";
import { useStream } from "./use-stream";

export type Asset = ApiSchemas['WebsocketTickerResponse'];
type UseAssetsParams = {
    enabled?: boolean;
    limit?: number;
    throttlingTimeMs?: number;
    sortOption?: AssetSortOptions;
    sortOrder?: SortOrder;
};

const REST_BASE_URL =
    process.env.NEXT_PUBLIC_BINANCE_REST_URL
    ??
    'https://api.binance.com/api/v3'

const WS_BASE_URL =
    process.env.NEXT_PUBLIC_BINANCE_WS_URL
    ??
    'wss://stream.binance.com:9443/ws'

const TICKERS_REST_URL = `${REST_BASE_URL}/ticker/24hr?type=MINI`;
const TICKERS_WS_URL = `${WS_BASE_URL}/!miniTicker@arr`;


export function useAssets({
    enabled = true,
    limit = 5,
    throttlingTimeMs = 10000,
    sortOption = 'volume',
    sortOrder = 'desc',
}: UseAssetsParams = {}) {
    const lastRunTimeRef = useRef(0);
    const isLoadedRef = useRef(false);
    const [pairs, setPairs] = useState<string[]>([]);

    const setInitialTickers = useTickersStore(
        state => state.setInitialTickers
    );
    const updateTickers = useTickersStore(
        state => state.updateTickers
    );

    const {
        data: tickers,
        isConnected,
        disconnect,
    } = useStream<Asset[]>(
        TICKERS_WS_URL,
        { enabled },
    );

    useEffect(() => {
        console.log(isLoadedRef)
        if (!isLoadedRef.current) {
            console.log(isLoadedRef)
            isLoadedRef.current = true;
            lastRunTimeRef.current = Date.now();

            fetchTickers()
                .then((tickers) => {
                    setInitialTickers(tickers);
                    setPairs(
                        sortAssets({
                            assets: tickers,
                            sortOption,
                            sortOrder,
                            limit
                        }).map(a => a.s)
                    );
                })
                .catch((error) => {
                    console.error("Failed to load initial tickers: ", error);
                })
        }
    }, [
        setInitialTickers,
        limit,
        sortOption,
        sortOrder,
    ]);

    useEffect(() => {
        if (
            !Array.isArray(tickers)
            ||
            tickers.length === 0
        ) {
            return;
        }

        updateTickers(tickers);
        const now = Date.now();

        if (
            now - lastRunTimeRef.current >= throttlingTimeMs
        ) {
            lastRunTimeRef.current = now;

            const currentTickers = Object.values(
                useTickersStore.getState().tickers
            );

            setPairs(
                sortAssets({
                    assets: currentTickers,
                    sortOption,
                    sortOrder,
                    limit
                }).map(a => a.s)
            );
        }
    }, [
        tickers,
        updateTickers,
        throttlingTimeMs,
        sortOption,
        sortOrder,
        limit,
    ]);

    const allTickers = useTickersStore((state) => state.tickers);

    const assets = useMemo(() => {
        if (pairs.length === 0) return (
            Array.from(
                {
                    length: limit
                },
                () => undefined
            )
        );

        return pairs.map((symbol) => allTickers[symbol]);
    }, [
        pairs,
        limit,
        allTickers,
    ]);

    return {
        assets,
        isConnected,
        disconnect,
    };
};

export async function fetchTickers() {
    const res = await fetch(TICKERS_REST_URL);
    if (!res.ok) {
        throw new Error(`Failed to fetch tickers: ${res.statusText}`);
    };

    const data: ApiSchemas['RestTickerResponse'][]
        = await res.json();

    return data.map(
        (item) => ({
            s: item.symbol,
            c: item.lastPrice,
            o: item.openPrice,
            q: item.quoteVolume,
        } as Asset)
    )
};

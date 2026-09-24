'use client'

import { ApiSchemas } from "@/api";
import { useMemo } from "react";
import { useStream } from "./use-stream";

type TickerResponse = ApiSchemas['TickerResponse'];
type UseAssetsOptions = {
    limit?: number;
    enabled?: boolean;
};

const WS_BASE_URL =
    process.env.NEXT_PUBLIC_BINANCE_WS_URL
    ??
    'wss://stream.binance.com:9443/ws'

const TICKERS_WS_URL = `${WS_BASE_URL}/!miniTicker@arr`;


export function useAssets({
    limit = 5,
    enabled = true,
}: UseAssetsOptions = {}) {
    const {
        data: tickers,
        isConnected,
        disconnect,
    } = useStream<TickerResponse[]>(
        TICKERS_WS_URL,
        { enabled },
    );

    const assets = useMemo(() => {
        if (!Array.isArray(tickers)) return [];

        return tickers
            .filter((t) => (
                t.s.endsWith('USDT')
                &&
                !t.s.includes('UP')
                &&
                !t.s.includes('DOWN')
            ))
            .sort((a, b) => (
                Number(b.q ?? 0)
                -
                Number(a.q ?? 0)
            ))
            .slice(0, limit)
    }, [tickers, limit]);

    return {
        assets,
        isConnected,
        disconnect,
    };
};

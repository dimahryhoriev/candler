import { ApiSchemas } from "@/api";
import { createStream } from "@/lib/api/create-stream";
import { create } from "zustand";

export type FuturesAsset = ApiSchemas['WebsocketFuturesTickerResponse'];

type FuturesTickersRecord = Record<string, FuturesAsset>;

export type FuturesTickersStore = {
    tickers: Record<string, FuturesAsset>;
    totalCount: number;
    isInitialized: boolean;
    isLoading: boolean;
    isConnected: boolean;
    init: () => void;
    update: (data: FuturesTickersRecord) => void;
    disconnect: () => void;
};

const REST_FUTURES_BASE_URL =
    process.env.NEXT_PUBLIC_BINANCE_FUTURES_REST_URL
    ??
    'https://fapi.binance.com/fapi/v1'

const WS_FUTURES_BASE_URL =
    process.env.NEXT_PUBLIC_BINANCE_FUTURES_WS_URL
    ??
    'wss://fstream.binance.com/market/ws'

const FUTURES_TICKERS_REST_URL = `${REST_FUTURES_BASE_URL}/ticker/24hr`;
const FUTURES_TICKERS_WS_URL = `${WS_FUTURES_BASE_URL}/!ticker@arr`;

const futuresTickersStream = createStream<FuturesAsset[]>({
    url: FUTURES_TICKERS_WS_URL,
    onData: (data) => {
        useFuturesTickersStore.getState().update(
            toFuturesTickersRecord(data),
        );
    },
    onStatusChange: (isConnected) => {
        useFuturesTickersStore.setState({
            isConnected,
        });
    },
});

export const useFuturesTickersStore = (
    create<FuturesTickersStore>(
        (set, get) => ({
            tickers: {},
            totalCount: 0,
            isInitialized: false,
            isLoading: false,
            isConnected: false,
            init: async () => {
                if (
                    get().isInitialized
                    ||
                    get().isLoading
                ) {
                    return;
                };

                set({ isLoading: true });

                try {
                    const rawTickers = await fetchFuturesTickers();
                    const tickersRecord = toFuturesTickersRecord(rawTickers);
                    set({
                        tickers: tickersRecord,
                        totalCount: rawTickers.length,
                        isInitialized: rawTickers.length > 0,
                        isLoading: false,
                    })
                    futuresTickersStream.connect();
                } catch (error) {
                    console.error('Failed to load initial tickers: ', error);
                    set({ isLoading: false });
                };
            },
            update: (newTickers) => {
                set((state) => ({
                    tickers: {
                        ...state.tickers,
                        ...newTickers,
                    },
                }));
            },
            disconnect: () => {
                futuresTickersStream.disconnect();
            },
        }),
    )
);

async function fetchFuturesTickers() {
    const res = await fetch(FUTURES_TICKERS_REST_URL);
    console.log(res);
    if (!res.ok) {
        throw new Error(`Failed to fetch futures tickers: ${res.statusText}`);
    };

    const data: ApiSchemas['RestFuturesTickerResponse'][]
        = await res.json();
    const now = Date.now();
    const maxInactivityTime = 10 * 60 * 1000;

    return data
        .filter(
            (item) => {
                const hasVolume = Number(item.quoteVolume) > 0;
                const isActive = item.closeTime
                    ? (now - item.closeTime) < maxInactivityTime
                    : false

                return isActive && hasVolume;
            },
        )
        .map(
            (item) => ({
                s: item.symbol,
                c: item.lastPrice,
                o: item.openPrice,
                q: item.quoteVolume,
                n: item.count,
                C: item.closeTime,
            } as FuturesAsset)
        );
};

const toFuturesTickersRecord = (
    assets: FuturesAsset[]
): FuturesTickersRecord => {
    return (
        Object.fromEntries(
            assets.map((a) => [a.s, a])
        )
    );
};

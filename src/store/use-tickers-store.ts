import { ApiSchemas } from "@/api";
import { Asset } from "@/hooks/use-assets";
import { createStream } from "@/lib/create-stream";
import { create } from "zustand";

type TickersRecord = Record<string, Asset>;

type TickersStore = {
    tickers: Record<string, Asset>;
    isInitialized: boolean;
    isLoading: boolean;
    isConnected: boolean;
    init: () => void;
    update: (data: TickersRecord) => void;
    disconnect: () => void;
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

const tickersStream = createStream<Asset[]>({
    url: TICKERS_WS_URL,
    onData: (data) => {
        useTickersStore.getState().update(
            toTickersRecord(data),
        );
    },
    onStatusChange: (isConnected) => {
        useTickersStore.setState({
            isConnected,
        });
    },
});

export const useTickersStore = (
    create<TickersStore>(
        (set, get) => ({
            tickers: {},
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
                    const rawTickers = await fetchTickers();
                    const tickersRecord = toTickersRecord(rawTickers);
                    set({
                        tickers: tickersRecord,
                        isInitialized: rawTickers.length > 0,
                        isLoading: false,
                    })
                    tickersStream.connect();
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
                tickersStream.disconnect();
            },
        }),
    )
);

async function fetchTickers() {
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
    );
};

const toTickersRecord = (
    assets: Asset[]
): TickersRecord => {
    return (
        Object.fromEntries(
            assets.map((a) => [a.s, a])
        )
    );
};

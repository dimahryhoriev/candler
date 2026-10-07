const REST_BASE_URL =
    process.env.NEXT_PUBLIC_BINANCE_REST_URL
    ??
    'https://api.binance.com/api/v3'

const KLINES_REST_URL = `${REST_BASE_URL}/klines`;

export type Interval =
    | '1m' | '3m' | '5m'
    | '15m' | '30m' | '1h'
    | '2h' | '4h' | '6h'
    | '8h' | '12h' | '1d'
    | '3d' | '1w' | '1M'

type KlineItem = {
    openTime: number;
    closeTime: number;
    openPrice: number;
    closePrice: number;
}

type AssetKlines = {
    symbol: string;
    klines: KlineItem[];
};

type UseKlinesParams = {
    symbols: string[];
    interval: Interval;
    limit: number;
};

export async function fetchKlines({
    symbols,
    interval,
    limit,
}: UseKlinesParams): Promise<AssetKlines[]> {
    const responses = await Promise.allSettled(
        symbols.map(
            async (symbol): Promise<AssetKlines> => {
                const payload = new URLSearchParams({
                    symbol,
                    interval,
                    limit: String(limit),
                });
                const url = `${KLINES_REST_URL}?${payload}`;
                const res = await fetch(url);

                if (!res.ok) {
                    throw new Error(`Failed to fetch klines for ${symbol}: ${res.statusText}`);
                };

                const rawKlines: (string | number)[][] = await res.json();
                const klines = rawKlines.map(
                    (kline) => ({
                        openTime: Number(kline[0]),
                        closeTime: Number(kline[6]),
                        openPrice: Number(kline[1]),
                        closePrice: Number(kline[4]),
                    }),
                );

                return {
                    symbol,
                    klines,
                };
            },
        ),
    );

    return (
        responses
            .filter(
                (r): r is PromiseFulfilledResult<AssetKlines> => (
                    r.status === 'fulfilled'
                )
            )
            .map(
                r => r.value
            )
    );
};

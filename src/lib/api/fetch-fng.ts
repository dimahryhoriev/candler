'use cache'

import { ApiSchemas } from "@/api";
import { cacheLife } from "next/cache";

export type FngItemsList = ApiSchemas['FngItem'][];

const FNG_REST_BASE_URL =
    process.env.NEXT_PUBLIC_FNG_URL
    ??
    'https://api.alternative.me/fng/'

export async function fetchFng({
    limit = 365,
}: {
    limit?: number;
} = {}): Promise<FngItemsList> {
    cacheLife({
        stale: 3600,
        revalidate: 3600,
        expire: 86400,
    });

    const url = `${FNG_REST_BASE_URL}?limit=${limit}`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Failed to fetch ${limit} fear & greed items: ${res.statusText}`);
    };

    const { data }: ApiSchemas['RestFngResponse'] = await res.json();
    return data;
};

import { ApiSchemas } from "@/api";

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
    const url = `${FNG_REST_BASE_URL}?limit=${limit}`;
    const res = await fetch(
        url,
        {
            next: {
                revalidate: 3600,
            },
        },
    );

    if (!res.ok) {
        throw new Error(`Failed to fetch ${limit} fear & greed items: ${res.statusText}`);
    };

    const { data }: ApiSchemas['RestFngResponse'] = await res.json();
    return data;
};

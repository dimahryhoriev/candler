import { QueryClient } from "@tanstack/react-query";

function createQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
                refetchOnWindowFocus: false,
            },
        },
    });
};

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
    if (typeof window === 'undefined') {
        return createQueryClient();
    };

    if (!browserQueryClient) {
        browserQueryClient = createQueryClient();
    };

    return browserQueryClient;
};

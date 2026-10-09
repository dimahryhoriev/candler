'use client';

import { getQueryClient } from "@/lib/api/query-client";
import { QueryClientProvider } from "@tanstack/react-query";

export function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <QueryClientProvider
            client={ getQueryClient() }
        >
            { children }
        </QueryClientProvider>
    );
};

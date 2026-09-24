'use client'

import { useCallback } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

type UseStreamOptions = {
    share?: boolean;
    reconnectAttempts?: number;
    reconnectInterval?: number;
    enabled?: boolean;
};

export const useStream = <T>(
    url: string,
    options: UseStreamOptions = {},
) => {
    const {
        share = true,
        reconnectAttempts = 10,
        reconnectInterval = 3000,
        enabled = true,
    } = options;

    const {
        lastJsonMessage,
        readyState,
        sendJsonMessage,
        getWebSocket,
    } = useWebSocket<T>(
        enabled ? url : null,
        {
            share,
            shouldReconnect: () => enabled,
            reconnectAttempts,
            reconnectInterval,
        },
    );

    const disconnect = useCallback(() => {
        const socket = getWebSocket();
        if (socket) socket.close();
    }, [getWebSocket]);

    return {
        data: lastJsonMessage,
        isConnected: readyState === ReadyState.OPEN,
        send: sendJsonMessage,
        disconnect,
    };
};

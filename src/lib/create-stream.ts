type CreateStreamOptions<T> = {
    url: string;
    onData: (data: T) => void;
    onStatusChange?: (isConnected: boolean) => void;
    reconnectAttempts?: number;
    reconnectInterval?: number;
};

export function createStream<TReceive, TSend = unknown>({
    url,
    onData,
    onStatusChange,
    reconnectAttempts = 10,
    reconnectInterval = 3000,
}: CreateStreamOptions<TReceive>) {
    let ws: WebSocket | null = null;
    let attempts = 0;
    let isExplicitlyClosed = false;
    let timerId: ReturnType<typeof setTimeout> | null = null;

    function connect() {
        if (typeof window === 'undefined') return;
        if (
            ws
            &&
            (
                ws.readyState === WebSocket.OPEN
                ||
                ws.readyState === WebSocket.CONNECTING
            )
        ) {
            return;
        };

        isExplicitlyClosed = false;
        ws = new WebSocket(url);

        ws.onopen = () => {
            attempts = 0;
            onStatusChange?.(true)
        };

        ws.onmessage = (e) => {
            try {
                const parsed = JSON.parse(e.data) as TReceive;
                onData(parsed);
            } catch (error) {
                console.error('Failed to parse WS message: ', error);
            };
        };

        ws.onclose = () => {
            onStatusChange?.(false);
            if (
                !isExplicitlyClosed
                &&
                attempts < reconnectAttempts
            ) {
                attempts += 1;
                timerId = setTimeout(connect, reconnectInterval);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error encountered: ', error);
        };
    };

    function disconnect() {
        isExplicitlyClosed = true;
        if (timerId) clearTimeout(timerId);
        if (ws) {
            ws.close();
            ws = null;
        };
        onStatusChange?.(false);
    };

    function send(data: TSend) {
        if (
            ws
            &&
            ws.readyState === WebSocket.OPEN
        ) {
            ws.send(JSON.stringify(data));
        } else {
            console.warn('WebSocket is not open. Unable to send data');
        };
    };

    return {
        connect,
        disconnect,
        send,
    };
};

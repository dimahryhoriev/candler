import { RefObject, useCallback, useEffect, useState } from "react";

interface ScrollAxisState {
    x: boolean;
    y: boolean;
}

interface ScrollState {
    isAtStart: ScrollAxisState;
    isAtEnd: ScrollAxisState;
    hasOverflow: ScrollAxisState;
    isScrolled: ScrollAxisState;
    canScroll: ScrollAxisState;
};

export function useScroll<T extends HTMLElement>(
    ref: RefObject<T | null>,
    watchKey?: string,
) {
    const [scrollState, setScrollState] = useState<ScrollState>({
        isAtStart: { x: true, y: true },
        isAtEnd: { x: false, y: false },
        hasOverflow: { x: false, y: false },
        isScrolled: { x: false, y: false },
        canScroll: { x: false, y: false },
    });

    const updateScrollState = useCallback(() => {
        const el = ref.current;
        if (!el) return;

        const hasOverflow = {
            x: el.scrollWidth > el.clientWidth,
            y: el.scrollHeight > el.clientHeight,
        };
        const isAtStart = {
            x: el.scrollLeft <= 0,
            y: el.scrollTop <= 0,
        };
        const isAtEnd = {
            x: Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth - 1,
            y: Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight - 1,
        };
        const isScrolled = {
            x: !isAtStart.x,
            y: !isAtStart.y
        };
        const canScroll = {
            x: hasOverflow.x && !isAtEnd.x,
            y: hasOverflow.y && !isAtEnd.y,
        };

        setScrollState({
            isAtStart,
            isAtEnd,
            hasOverflow,
            isScrolled,
            canScroll,
        });
    }, [ref]);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        updateScrollState();

        const observer = new ResizeObserver(updateScrollState);
        observer.observe(el);

        return () => observer.disconnect();
    }, [ref, updateScrollState, watchKey]);

    return {
        scrollState,
        updateScrollState,
    };
};

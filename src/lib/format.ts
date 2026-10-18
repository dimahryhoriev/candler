import { TimeframeTickFormat } from "./timeframes";

export const dateTimeFormatters: Record<TimeframeTickFormat, Intl.DateTimeFormat> = {
    H: new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit', hour12: false }),
    D: new Intl.DateTimeFormat(undefined, { weekday: 'short' }),
    W: new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'short' }),
    M: new Intl.DateTimeFormat(undefined, { month: 'short' }),
    Y: new Intl.DateTimeFormat(undefined, { year: 'numeric' }),
};

function findNonZeroValue(
    value: string,
) {
    const firstNonZeroValue = /[1-9]/.exec(value);
    if (!firstNonZeroValue) {
        return {
            value: null,
            index: null,
        };
    };

    return {
        value: firstNonZeroValue?.[0],
        index: firstNonZeroValue?.index,
    };
};

export function formatNumber(
    number: string | undefined,
) {
    if (!number) {
        return (
            '-- --'
        );
    };

    const [int, fract = '00'] = number.split('.');

    const intNonZeroValue = findNonZeroValue(int);
    const fractNonZeroValue = findNonZeroValue(fract);

    const formattedInt =
        intNonZeroValue.index !== null
            ? Number(int.slice(intNonZeroValue.index))
                .toLocaleString('en-US')
            : '0'

    const formattedFract =
        fractNonZeroValue.index !== null
            ? fract.slice(0, fractNonZeroValue.index + 3)
            : '00'

    return (
        `${formattedInt}.${formattedFract}`
    );
};

export function formatChange(
    change: number,
) {
    return (
        `${change > 0 ? '+' : ''}${change.toFixed(2)}%`
    );
};

export function formatSymbol(
    symbol: string,
    letterCase: 'upper' | 'lower' | 'capitalize',
) {
    const formattedSymbol = `${symbol.slice(0, -4)}`;

    switch (letterCase) {
        case 'upper': return formattedSymbol.toUpperCase()
        case 'lower': return formattedSymbol.toLowerCase()
        case 'capitalize': return (
            (
                formattedSymbol.charAt(0)
                    .toUpperCase()
            )
            +
            (
                formattedSymbol.slice(1)
                    .toLowerCase()
            )
        );
    };
};

export function formatDate({
    dateMs,
    formatKey,
}: {
    dateMs: number;
    formatKey: TimeframeTickFormat;
}) {
    return (
        dateTimeFormatters[formatKey].format(
            dateMs
        )
    );
};

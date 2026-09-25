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

export function formatPrice(
    price: string,
) {
    const [int, fract = '00'] = price.split('.');

    const intNonZeroValue = findNonZeroValue(int);
    const fractNonZeroValue = findNonZeroValue(fract);

    const formattedInt =
        intNonZeroValue.index !== null
            ? int.slice(intNonZeroValue.index)
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

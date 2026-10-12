export function createColorsMap(
    keys: string[],
    colors: string[],
): Map<string, string> {
    const map = new Map<string, string>();

    if (!colors.length) return map;

    keys.forEach(
        (key, index) => {
            map.set(key, colors[index % colors.length]);
        },
    );

    return map;
};

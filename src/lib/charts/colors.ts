export type ColorsMap = Map<string, string>;

export function createColorsMap(
    keys: string[],
    colors: string[],
): ColorsMap {
    const map: ColorsMap = new Map<string, string>();

    if (!colors.length) return map;

    keys.forEach(
        (key, index) => {
            map.set(key, colors[index % colors.length]);
        },
    );

    return map;
};

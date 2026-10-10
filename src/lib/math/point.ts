export type Point = {
    x: number;
    y: number;
};

export function diffPoints(
    point1: Point,
    point2: Point,
) {
    return {
        x: point2.x - point1.x,
        y: point2.y - point1.y,
    };
};

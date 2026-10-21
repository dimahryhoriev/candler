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

export function findHypotenuse(
    point1: Point,
    point2: Point,
) {
    const diff = diffPoints(point1, point2);
    return Math.sqrt((diff.x ** 2) + (diff.y ** 2));
};

export function findClosestPoint({
    points,
    targetPoint,
    findBy,
    maxDistance = 15,
}: {
    points: Point[],
    targetPoint: Point,
    findBy: 'xy' | 'x' | 'y',
    maxDistance?: number,
}) {
    if (!points.length) return null;

    let closestPoint = points[0];
    let minDiff = Infinity;

    switch (findBy) {
        case 'xy': {
            for (let i = 0; i < points.length; i++) {
                const diff = findHypotenuse(
                    points[i],
                    targetPoint,
                );

                if (diff < minDiff) {
                    minDiff = diff;
                    closestPoint = points[i];
                };
            };

            break;
        };
        case 'x': {
            for (let i = 0; i < points.length; i++) {
                const diff = Math.abs(points[i].x - targetPoint.x);

                if (diff <= minDiff) {
                    minDiff = diff;
                    closestPoint = points[i];
                } else {
                    break;
                };
            };

            break;
        };
        case 'y': {
            for (let i = 0; i < points.length; i++) {
                const diff = Math.abs(points[i].y - targetPoint.y);

                if (diff < minDiff) {
                    minDiff = diff;
                    closestPoint = points[i];
                };
            };

            break;
        };
    };

    if (minDiff > maxDistance) return null;

    return closestPoint;
};

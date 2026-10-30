'use client'

import { useCanvasRect } from "@/hooks/use-canvas-rect";
import { FngItemsList } from "@/lib/api/fetch-fng";
import { capitalizeString } from "@/lib/format";
import { scaleAngleToPoint } from "@/lib/math/point";
import { FngLines } from "./fng-cards";
import { getFngStatus } from "./get-fng-status";

export function FngIndicatorCard({
    title = 'Current Index',
    fngTicks,
    lines,
}: {
    title?: string;
    fngTicks: FngItemsList;
    lines: FngLines;
}) {
    const lastTick = fngTicks[0];

    return (
        <div
            className="
                border rounded-xl hover:cursor-pointer
                transition-colors duration-100 flex
                bg-background hover:bg-secondary p-4
                w-full h-full gap-4 flex flex-col items-center
            "
        >
            <span
                className="
                    text-base self-start font-semibold font-mono
                "
            >
                {
                    title
                }
            </span>
            <FngIndicator
                fngIndex={ Number(lastTick.value) }
                lines={ lines }
            />
        </div>
    )
};

function FngIndicator({
    fngIndex,
    lines,
}: {
    fngIndex: number;
    lines: string[];
}) {
    const { canvasRef, canvasRect } = useCanvasRect();

    const fngStatus = getFngStatus(fngIndex) ?? 'Unknown';
    const lineWidth = 10;
    const dotWidth = 8;

    const circle = {
        center: {
            x: (canvasRect?.width ?? 0) / 2,
            y: canvasRect?.height ?? 0,
        },
        r: ((canvasRect?.width ?? 0) / 2) - lineWidth,
    };

    const linesCount = lines.length;
    const angleStep = 180 / linesCount;
    const gap = 10;

    const clampedFngIndex = Math.min(Math.max(fngIndex, 0), 100);
    const dotAngle = 180 + ((clampedFngIndex / 100) * 180);
    const dotPosition = scaleAngleToPoint({ circle, angle: dotAngle });

    const formattedFngStatus = fngStatus.split('-')
        .map(s => capitalizeString(s));

    return (
        <div
            className="
                flex justify-center
                w-fit relative
            "
        >
            <svg
                ref={ canvasRef }
                className="
                    w-40 aspect-[2/1] overflow-hidden
                "
            >
                <defs>
                    <mask id="indicator-mask">
                        <rect width="100%" height="100%" fill="white" />
                        <circle
                            cx={ dotPosition.x }
                            cy={ dotPosition.y }
                            r={ dotWidth + 4 }
                            fill="black"
                        />
                    </mask>
                </defs>
                <g mask="url(#indicator-mask)">
                    {
                        lines.map(
                            (c, i) => {
                                const startAngle = 180 + (i * angleStep) + (gap / 2);
                                const endAngle = 180 + (((i + 1) * angleStep) - (gap / 2));

                                const r = circle.r;
                                const p1 = scaleAngleToPoint({ circle, angle: startAngle });
                                const p2 = scaleAngleToPoint({ circle, angle: endAngle });

                                const line = `M ${p1.x} ${p1.y} A ${r} ${r} 0 0 1 ${p2.x} ${p2.y}`;

                                return (
                                    <path
                                        key={ i }
                                        d={ line }
                                        fill="none"
                                        stroke={ `var(${lines[i]})` }
                                        strokeWidth={ lineWidth }
                                        strokeLinecap="round"
                                    />
                                );
                            }
                        )
                    }
                </g>
                <circle
                    cx={ dotPosition.x }
                    cy={ dotPosition.y }
                    r={ dotWidth }
                    className="fill-foreground"
                />
            </svg>
            <div
                className="
                    flex flex-col w-fit
                    absolute items-center bottom-0
                "
            >
                <span className="text-3xl font-bold">
                    {
                        fngIndex
                    }
                </span>
                <span className="text-sm text-zinc-500">
                    {
                        formattedFngStatus
                    }
                </span>
            </div>
        </div>
    );
};

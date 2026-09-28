import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

export function SkeletonGroup({
    className,
    itemsCount,
}: {
    className?: string;
    itemsCount: number;
}) {
    return (
        <div
            className={
                cn(
                    "flex gap-6 w-124 h-6",
                    className
                )
            }
        >
            {
                Array.from(
                    {
                        length: itemsCount
                    },
                    (_, index) => (
                        <Skeleton
                            key={ index }
                            className="flex-1 h-full"
                        />
                    )
                )
            }
        </div>
    );
};

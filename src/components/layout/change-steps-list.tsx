import { formatChange, formatNumber } from "@/lib/format";

export function ChangeStepsList({
    changeSteps,
    isLoading,
}: {
    changeSteps: number[];
    isLoading: boolean;
}) {
    return (
        <div
            className="
                        flex flex-col gap-8
                        h-full w-fit
                    "
        >
            {
                !isLoading
                    ? (
                        changeSteps.map(
                            (change, index) => (
                                <span
                                    className="text-xs"
                                    key={ `${index}` }
                                >
                                    {
                                        formatChange(change)
                                    }
                                </span>
                            )
                        )
                    )
                    : Array.from(
                        { length: 8 },
                        (_, index) => (
                            <span
                                className="text-xs"
                                key={ `${index}` }
                            >
                                {
                                    formatChange(Number(formatNumber('0')))
                                }
                            </span>
                        )
                    )
            }
        </div>
    );
};

import { cn } from "@/lib/utils";

export function AuthDivider({
    className,
    text = 'or',
}: {
    className?: string;
    text?: string;
}) {
    return (
        <div
            className={
                cn(
                    'flex items-center text-sm w-full',
                    'h-fit gap-3 text-zinc-400',
                    className,
                )
            }
        >
            <div className="flex-1 w-full h-[1px] bg-zinc-300" />
            { text }
            <div className="flex-1 w-full h-[1px] bg-zinc-300" />
        </div>
    )
};

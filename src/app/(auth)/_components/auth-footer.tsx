
export function AuthFooter({
    text,
    link,
}: {
    text: string;
    link: React.ReactNode;
}) {
    return (
        <div
            className="flex flex-col gap-8 w-full items-center"
        >
            <div className="shrink-0 w-full h-[1px] bg-zinc-300" />
            <span className="text-sm">
                { text } { link }
            </span>
        </div>
    )
};

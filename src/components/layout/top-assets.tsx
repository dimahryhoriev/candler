export function TopAssets({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="hidden md:flex items-center gap-6 text-xs">
            {
                children
            }
        </div>
    );
};

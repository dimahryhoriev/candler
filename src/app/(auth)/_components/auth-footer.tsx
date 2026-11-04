import { AuthMode } from "./auth-template";

export function AuthFooter({
    mode,
    link,
}: {
    mode: AuthMode;
    link: React.ReactNode;
}) {
    return (
        <div
            className="flex flex-col gap-8 w-full items-center"
        >
            <div className="shrink-0 w-full h-[1px] bg-zinc-300" />
            <span className="text-sm">
                {
                    mode === 'login'
                        ? `Already have an account? `
                        : `Don't have an account? `
                }
                {
                    link
                }
            </span>
        </div>
    )
};

import { AuthHeader } from "./auth-header";

export function AuthTemplate({
    title,
    form,
    footer,
}: {
    title: string;
    form: React.ReactNode;
    footer: React.ReactNode;
}) {
    return (
        <>
            <AuthHeader
                description="Crypto Tracker"
            />
        </>
    );
};

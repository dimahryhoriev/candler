export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main
            className="
                container mx-auto px-4 py-12
            "
        >
            { children }
        </main>
    );
};

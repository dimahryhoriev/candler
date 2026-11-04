export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main
            className="
                flex flex-col container mx-auto min-h-screen
                items-center px-4 py-8 justify-between
            "
        >
            { children }
        </main>
    );
};

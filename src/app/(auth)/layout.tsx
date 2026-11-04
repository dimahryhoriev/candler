export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main
            className="
                flex flex-col container mx-auto
                items-center px-4 py-12 gap-30
            "
        >
            { children }
        </main>
    );
};

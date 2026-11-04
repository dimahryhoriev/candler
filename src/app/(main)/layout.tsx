import { Header } from "@/components/layout/header/header";

export default function MainLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main
                className="
                    container mx-auto px-4 py-12
                "
            >
                { children }
            </main>
        </>
    );
};

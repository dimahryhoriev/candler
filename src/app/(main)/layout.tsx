import { Header } from "@/components/layout/header";

export default function MainLayout({
    children
}: LayoutProps<"/">) {
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

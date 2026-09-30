import { Header } from "@/components/layout/header";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans'
});


export default function RootLayout({
    children
}: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={ cn("h-full antialiased", "font-sans", inter.variable) }
        >
            <body
                className="min-h-full flex flex-col"
            >
                <Header />
                <main
                    className="
                        container mx-auto px-4 py-12
                    "
                >
                    {
                        children
                    }
                </main>
            </body>
        </html>
    );
};

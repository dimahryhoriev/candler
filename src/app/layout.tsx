import { Header } from "@/components/layout/header";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

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
                <Providers>
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
                </Providers>
            </body>
        </html>
    );
};

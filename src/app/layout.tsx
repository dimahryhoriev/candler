import { cn } from "@/shared/lib/utils";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });


export default function RootLayout({
    children
}: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={ cn("h-full antialiased", "font-sans", geist.variable) }
        >
            <body
                className="min-h-full flex flex-col"
            >
                { children }
            </body>
        </html>
    );
};

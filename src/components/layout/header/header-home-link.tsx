import Link from "next/link";

export function HeaderHomeLink() {
    return (
        <div
            className="flex gap-1.5"
        >
            <Link
                href='/'
                className="
                    font-bold text-xl tracking-tight
                "
            >
                Candler
            </Link>
        </div>
    );
};

import Link from "next/link";

export function HeaderNavbar() {
    return (
        <nav
            className="
                flex items-center
                text-md font-medium
            "
        >
            <Link
                className="
                    w-fit px-6 py-2 hover:bg-muted
                    rounded-full transition-colors
                    duration-200
                "
                href="/markets"
            >
                Markets
            </Link>
        </nav>
    )
};

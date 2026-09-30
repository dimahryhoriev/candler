import Link from "next/link";

export function TopGainers({
    title,
}: {
    title: string;
}) {
    return (
        <div
            className="flex flex-col gap-6"
        >
            <Link
                href="markets"
                className="
                        text-xl font-medium w-fit
                        hover:text-blue-600
                        transition-colors duration-100
                    "
            >
                { `${title} >` }
            </Link>
        </div>
    );
};

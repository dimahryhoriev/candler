import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const headingVariants = cva(
    'flex flex-col gap-2',
    {
        variants: {
            size: {
                sm: '[&_h1]:text-lg [&_p]:text-xs',
                md: '[&_h1]:text-xl [&_p]:text-sm',
                lg: '[&_h1]:text-2xl [&_p]:text-base',
                xl: '[&_h1]:text-4xl [&_p]:text-base',
            },
        },
        defaultVariants: {
            size: 'md',
        },
    },
);

interface HeadingProps extends VariantProps<typeof headingVariants> {
    title: string;
    description: string;
    className?: string;
};

export function Heading({
    title,
    description,
    className,
    size,
}: HeadingProps) {
    return (
        <div
            className={
                cn(
                    headingVariants({ size }),
                    className,
                )
            }
        >
            <h1 className="font-medium"> { title } </h1>
            <p>{ description }</p>
        </div>
    );
};

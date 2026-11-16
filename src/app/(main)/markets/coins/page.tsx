import { Heading } from "@/components/ui/heading";
import { CoinsTable } from "./_components/coins-table";

export default function MarketsCoinsPage() {
    const headingDescription =
        "Monitor the full crypto landscape across majors and altcoins. Price action reacts heavily to overall market dynamics and media coverage, so examine price trends and data points before taking action.";

    return (
        <div className="flex flex-col gap-8">
            <Heading
                className="w-1/2"
                title="Explore all crypto assets in one place"
                description={ headingDescription }
                size="lg"
            />
            <CoinsTable />
        </div>
    );
};

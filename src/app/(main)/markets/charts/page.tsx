import { Heading } from "@/components/ui/heading";

export default function MarketsChartsPage() {
    const headingDescription = "Track normalized percentage price changes across market tiers in real time. Benchmark altcoin momentum against Bitcoin and Ethereum over any timeframe to spot sector rotations and trend reversals."

    return (
        <div>
            <Heading
                className="w-1/2"
                title="Comparative Performance Charts"
                description={ headingDescription }
                size="lg"
            />
        </div>
    );
};

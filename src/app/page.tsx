import { TopAssets } from "@/components/layout/top-assets";
import { TopGainers } from "@/components/layout/top-gainers";
import { TopLosers } from "@/components/layout/top-losers";

export default function HomePage() {
    return (
        <div
            className="flex flex-col gap-14"
        >
            <TopAssets
                title="Market Overview"
            />
            <TopGainers
                title="Top Gainers"
            />
            <TopLosers
                title="Top Losers"
            />
        </div>
    );
};

import { AssetsList } from "@/components/layout/assets-list";
import { PerformanceChart } from "@/components/layout/performance-chart";

export default function HomePage() {
    return (
        <div
            className="flex flex-col gap-14"
        >
            <AssetsList
                title="Market Overview"
                mode="cards"
                sortOption="volume"
                sortOrder="desc"
                limit={ 4 }
            />
            <div
                className="
                    flex justify-start gap-6
                "
            >
                <AssetsList
                    title="Top Gainers"
                    mode="rows"
                    sortOption="change"
                    sortOrder="desc"
                    limit={ 6 }
                />
                <AssetsList
                    title="Top Losers"
                    mode="rows"
                    sortOption="change"
                    sortOrder="asc"
                    limit={ 6 }
                />
            </div>
            <div
                className="
                    flex justify-start gap-6
                "
            >
                <PerformanceChart
                    assetsType="majors"
                    timeframeKey="1Y"
                />
            </div>
        </div>
    );
};

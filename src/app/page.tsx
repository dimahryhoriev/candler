import { AssetsList } from "@/components/layout/assets-list/assets-list";
import { FngCards } from "@/components/layout/fng-cards/fng-cards";
import { HomeChartsSection } from "./_components/home-charts-section";
import { HomeListsSection } from "./_components/home-lists-section";

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
            <HomeChartsSection />
            <HomeListsSection />
            <FngCards />
        </div>
    );
};

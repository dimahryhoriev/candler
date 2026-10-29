import { AssetsList } from "@/components/layout/assets-list/assets-list";

export function HomeListsSection() {
    return (
        <div
            className="
                flex flex-col gap-14
            "
        >
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
                <AssetsList
                    title="Top Volume"
                    mode="rows"
                    sortOption="volume"
                    sortOrder="desc"
                    limit={ 6 }
                />
                <AssetsList
                    title="Lowest Volume"
                    mode="rows"
                    sortOption="volume"
                    sortOrder="asc"
                    limit={ 6 }
                />
            </div>
        </div>
    )
};

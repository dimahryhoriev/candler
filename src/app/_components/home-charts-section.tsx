import { PerformanceChart } from "@/components/layout/performance-chart/performance-chart";

export function HomeChartsSection() {
    return (
        <div
            className="
                flex justify-start gap-14
            "
        >
            <PerformanceChart
                assetsType="majors"
            />
            <PerformanceChart
                assetsType="altcoins"
            />
        </div>
    )
};

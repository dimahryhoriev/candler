import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tab } from "./coins-table";

export function CoinsTableTabs({
    onTabChange,
}: {
    onTabChange: (val: Tab) => void;
}) {
    return (
        <Tabs
            defaultValue="overview"
            onValueChange={ (val) => onTabChange(val as Tab) }
        >
            <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="futures">Futures</TabsTrigger>
            </TabsList>
        </Tabs>
    );
};

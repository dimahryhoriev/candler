import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CoinsTableTab } from "./coins-table";

export function CoinsTableTabs({
    onTabChange,
}: {
    onTabChange: (val: CoinsTableTab) => void;
}) {
    return (
        <Tabs
            defaultValue="overview"
            onValueChange={ (val) => onTabChange(val as CoinsTableTab) }
        >
            <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="futures">Futures</TabsTrigger>
            </TabsList>
        </Tabs>
    );
};

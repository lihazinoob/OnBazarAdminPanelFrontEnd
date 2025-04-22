import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import Tab from "./Tab";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart";
import { useState } from "react";
const chartData = [
  { month: "January", sales: 186 },
  { month: "February", sales: 305 },
  { month: "March", sales: 237 },
  { month: "April", sales: 73 },
  { month: "May", sales: 209 },
  { month: "June", sales: 214 },
  { month: "July", sales: 250 },
  { month: "August", sales: 190 },
  { month: "September", sales: 300 },
  { month: "October", sales: 220 },
  { month: "November", sales: 280 },
  { month: "December", sales: 350 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function SalesChart() {
  // State to find which tab is active
  const [activeTab, setActiveTab] = useState<"3m" | "6m" | "1y">("6m");

  // Filtering the data based on the chart

  const filteredData = (() => {
    const monthsToShow = activeTab === "3m" ? 3 : activeTab === "6m" ? 6 : 12;
    return chartData.slice(-monthsToShow);
  })();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales OverView</CardTitle>
        <CardDescription>Customers for the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 border-b mb-4">
          <Tab
            value="3m"
            activeTab={activeTab}
            onTabChange={setActiveTab}
            label="3 Months"
          />

          <Tab
            value="6m"
            activeTab={activeTab}
            onTabChange={setActiveTab}
            label="6 Months"
          />
          <Tab
            value="1y"
            activeTab={activeTab}
            onTabChange={setActiveTab}
            label="1 Year"
          />
        </div>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={filteredData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="sales"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {activeTab === "3m" && "Last 3 months"}
              {activeTab === "6m" && "Last 6 months"}
              {activeTab === "1y" && "Last 12 months"}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

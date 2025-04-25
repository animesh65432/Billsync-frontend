import { Label, Pie, PieChart } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { dummyInvoices } from "@/pages/Dashborad"
const chartConfig: ChartConfig = {
    status: {
        label: "Status",
    },
    PENDING: {
        label: "Pending",
        color: "hsl(var(--chart-1))",
    },
    SUCCEED: {
        label: "Succeeded",
        color: "hsl(var(--chart-2))",
    },
} as ChartConfig

const InvoiceChart = () => {
    const statusCounts = dummyInvoices.reduce(
        (acc, invoice) => {
            if (invoice.status === "PENDING") acc.PENDING += 1;
            else if (invoice.status === "SUCCEED") acc.SUCCEED += 1;
            return acc;
        },
        { PENDING: 0, SUCCEED: 0 }
    );

    const chartData = [
        {
            name: chartConfig.PENDING.label,
            value: statusCounts.PENDING,
            fill: chartConfig.PENDING.color,
        },
        {
            name: chartConfig.SUCCEED.label,
            value: statusCounts.SUCCEED,
            fill: chartConfig.SUCCEED.color,
        },
    ];


    return (
        <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
        >
            <PieChart>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    strokeWidth={5}
                >
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                    <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                    >
                                        <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            className="fill-foreground text-3xl font-bold"
                                        >
                                            {dummyInvoices.length}
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 24}
                                            className="fill-muted-foreground"
                                        >
                                            Invoices
                                        </tspan>
                                    </text>
                                );
                            }
                            return null;
                        }}
                    />
                </Pie>
            </PieChart>
        </ChartContainer>
    );
};

export default InvoiceChart;

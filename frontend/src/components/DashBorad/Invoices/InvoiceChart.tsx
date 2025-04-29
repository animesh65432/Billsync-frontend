import { Label, Pie, PieChart, Tooltip } from "recharts";
import { useStore } from "@/store";

const chartConfig = {
    status: {
        label: "Status",
    },
    PENDING: {
        label: "Pending",
        color: "#8884d8",
    },
    SUCCEED: {
        label: "Succeeded",
        color: "#82ca9d",
    },
};

const InvoiceChart = () => {
    const { invoices } = useStore()
    const statusCounts = invoices.reduce(
        (acc, invoice) => {
            if (invoice.status === "PENDING") acc.PENDING += 1;
            else if (invoice.status === "SUCCEED") acc.SUCCEED += 1;
            return acc;
        },
        { PENDING: 0, SUCCEED: 0 }
    );
    const PendingAmount = invoices.reduce(
        (acc, cur) => cur.status === "PENDING" ? acc + cur.amount : acc,
        0
    );
    const SucesseAmount = invoices.reduce(
        (acc, cur) => cur.status === "SUCCEED" ? acc + cur.amount : acc,
        0
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
        <div className="flex flex-col">
            <div className="items-center pb-0 flex justify-center font-bold">
                <p>{invoices.length.toLocaleString()} Total Invoices</p>
            </div>

            <div >
                <PieChart width={190} height={190} >
                    <Tooltip />
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={60}
                        outerRadius={80}
                        strokeWidth={5}
                    >
                        <Label
                            content={({ viewBox }) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                    return (
                                        <></>
                                    );
                                }
                                return null;
                            }}
                        />
                    </Pie>
                </PieChart>
            </div>


            <div className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Pending Amount   ${PendingAmount.toLocaleString()}
                </div>
                <div className="font-medium">
                    Sucessful amount ${SucesseAmount.toLocaleString()}
                </div>
            </div>
        </div>
    );
};

export default InvoiceChart;

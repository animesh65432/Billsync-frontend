import { ColumnDef } from "@tanstack/react-table"
import { InvoicesTypes } from "@/types"
import { Icons } from "@/Icon"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
const InvoicesActions = () => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem >
                    <Button
                        variant="ghost"
                        className="text-center"

                    >
                        View
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem >
                    <Button
                        variant="ghost"
                        className="text-center"

                    >
                        Send Reminder
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem >
                    <Button
                        variant="ghost"
                        className="text-center"

                    >
                        Edit
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem >
                    <Button
                        variant="ghost"
                        className="text-center"

                    >
                        Delete
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>)
}

export const Invoicescolumns: ColumnDef<InvoicesTypes>[] = [
    {
        accessorKey: "clientName",
        header: "Client Name",
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "INR",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="h-8 flex items-center gap-1 -ml-4">
                        CateGory
                        <ArrowUpDown className="h-4 w-4" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => column.setFilterValue(undefined)}>
                        All
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => column.setFilterValue("PENDING")}>
                        PENDING
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => column.setFilterValue("SUCCEED")}>
                        SUCCEED
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        }
    },
    {
        accessorKey: "dueDate",
        cell: ({ row }) => {
            const date = new Date(row.getValue("dueDate"));
            const indiaDate = date.toLocaleDateString("en-IN", {
                timeZone: "Asia/Kolkata",
                day: "numeric",
                month: "short",
                year: "numeric",
            });
            return <div>{indiaDate}</div>;
        },



    }, {
        accessorKey: "reminderSent",
        cell: ({ row }) => {

            return <div className="text-right font-medium">{row.getValue("reminderSent") ? <Icons.right /> : <Icons.wrong />}</div>
        },
    },
    {
        id: "actions",
        cell: () => <InvoicesActions />
    },
]
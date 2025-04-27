import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { InvoicesTypes } from "@/types"
import { Icons } from "@/Icon"
import { useStore } from "@/store"


export const Invoicescolumns: ColumnDef<InvoicesTypes>[] = [
    {
        accessorKey: "clientName",
        header: () => {
            const { color } = useStore()
            return <p className={`${color ? "text-white" : "text-black"} up`}>ClientName</p>
        }
    },
    {
        accessorKey: "amount",
        header: () => {
            const { color } = useStore()
            return <p className={`${color ? "text-white" : "text-black"} uppercase`}>amount</p>

        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "INR",
            }).format(amount)

            return <div >{formatted}</div>
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            const { color } = useStore()
            return <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className={`${color ? "text-white" : "text-black"} uppercase flex`}>
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
        header: () => {
            const { color } = useStore()
            return <p className={`${color ? "text-white" : "text-black"} uppercase`}>dueDate</p>

        },
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
        header: () => {
            const { color } = useStore()
            return <p className={`${color ? "text-white" : "text-black"} uppercase`}>reminderSent</p>
        },
        cell: ({ row }) => {
            return <div className=" font-medium text-right">{row.getValue("reminderSent") ? <Icons.right /> : <Icons.wrong />}</div>
        },
    }, {
        id: "actions",
        cell: () => {
            return <DropdownMenu>
                <DropdownMenuTrigger>
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        }
    }

]
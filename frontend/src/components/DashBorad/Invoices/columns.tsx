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
import { Delete, markaspaid } from "@/api/Invoices"
import { sentreminder } from "@/api/reminder"
import { useState } from "react"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"



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
        cell: ({ row }) => {
            const { deleteinvoice, makeinvoicePaidInvoice, token } = useStore()
            const [reminderlodaing, sentreminderloading] = useState<boolean>(false)
            const [deletInvoiceloading, setdeleteinvoiceloading] = useState<boolean>(false)
            const [makepaidInvoiceloading, setmakepaidInvoiceloading] = useState<boolean>(false)
            const sendRemider = async (id: number) => {
                sentreminderloading(true)
                try {
                    await sentreminder(id, token)
                    toast.success("Sucessfully sent it")
                } finally {
                    sentreminderloading(false)
                }
            }

            const deletInvoice = async (id: number) => {
                setdeleteinvoiceloading(true)
                try {
                    await Delete(id, token)
                    toast.success("sucessfully delete it")
                    deleteinvoice(id)
                }
                finally {
                    sentreminderloading(false)
                }
            }

            const makepaidInvoice = async (id: number) => {
                setmakepaidInvoiceloading(true)
                try {
                    await markaspaid(id, token)
                    toast.success("sucssfully update it")
                    makeinvoicePaidInvoice(id)
                } finally {
                    setmakepaidInvoiceloading(false)
                }
            }
            return <DropdownMenu>
                <DropdownMenuTrigger>
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <Link to={`/view-invoice/${row.original.id}`}>
                        <DropdownMenuItem>View</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={() => sendRemider(row.original.id)} disabled={reminderlodaing}>{reminderlodaing ? <Icons.spinner className="h-3 w-3" /> : "Send Reminder"}</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => makepaidInvoice(row.original.id)} disabled={makepaidInvoiceloading} >
                        {makepaidInvoiceloading ? <Icons.spinner className="h-3 w-3" /> : " Mark as paid"}
                    </DropdownMenuItem>
                    <Link to={`/update-invoice/${row.original.id}`}>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={() => deletInvoice(row.original.id)} disabled={deletInvoiceloading}>
                        {deletInvoiceloading ? <Icons.spinner className="h-3 w-3" /> : "Delete"}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        }
    }

]

// function usestate<T>(arg0: boolean): [any, any] {
//     throw new Error("Function not implemented.")
// }

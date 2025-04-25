import { useEffect, useState } from "react"
import { Sidebar, Dashboard, LoadinSpinner, } from "@/components"
import { GetInvoices } from "@/api/Invoices"
import { InvoicesTypes } from "@/types/index"
import { useStore } from "@/store"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
export const dummyInvoices: InvoicesTypes[] = [
    {
        clientName: "Alice Johnson",
        id: 1,
        amount: 250.5,
        status: "PENDING",
        dueDate: new Date("2025-04-30"),
        reminderSent: false,
    },
    {
        clientName: "Bob Smith",
        id: 2,
        amount: 1000,
        status: "SUCCEED",
        dueDate: new Date("2025-03-15"),
        reminderSent: true,
    },
    {
        clientName: "Clara Wilson",
        id: 3,
        amount: 475.75,
        status: "PENDING",
        dueDate: new Date("2025-05-10"),
        reminderSent: false,
    },
    {
        clientName: "Daniel Kim",
        id: 4,
        amount: 850.25,
        status: "SUCCEED",
        dueDate: new Date("2025-02-20"),
        reminderSent: true,
    },
    {
        clientName: "Evelyn Parker",
        id: 5,
        amount: 320,
        status: "PENDING",
        dueDate: new Date("2025-04-25"),
        reminderSent: true,
    },
];

export default function Dashborad() {
    const [loading, setloading] = useState<boolean>(false)
    const { setInvoiceStore } = useStore()

    async function init() {
        setloading(true)
        try {
            const Invoices = await GetInvoices("eyJhbGciOiJIUzI1NiJ9.dGVzdEBnbWFpbC5jb20.WW8_MBkcdmvtxP3yUkzbJa-rnsKeBX3IM0ncMdX1m_I") as InvoicesTypes[]
            setInvoiceStore(Invoices)
        } catch (error) {
            console.log(error)
        }
        finally {
            setloading(false)
        }
    }
    useEffect(() => {
        init()
    }, [])
    return (
        <div className="grid grid-cols-12  h-[100vh]">
            <div className="hidden xl:block xl:col-span-1 border-r border-black h-full">
                <Sidebar />
            </div>

            <div className="col-span-12 xl:col-span-11  h-full">
                <LoadinSpinner loading={loading} >
                    <Dashboard />
                </LoadinSpinner>
            </div>
        </div>
    )
}

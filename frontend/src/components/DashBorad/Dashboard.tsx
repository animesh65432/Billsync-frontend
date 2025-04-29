import { InvoicesTable, Invoicescolumns } from "@/components"
import InvoiceChart from "./Invoices/InvoiceChart"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useStore } from "@/store"
import { Link } from "react-router-dom"
export default function Dashboard() {
    const [globalFilter, setGlobalFilter] = useState<string>("")
    const { invoices } = useStore()

    if (invoices.length === 0) {
        return <div className="h-[100vh]  flex items-center justify-center ">
            <div className="font-semibold text-xl font-mono text-center">
                <div>don't have any invoices till now</div>
                <div className="underline"><Link to="/create-invoice">Create now</Link></div>
            </div>
        </div>
    }
    return (
        <div className="p-4  flex flex-col w-full h-[100vh]">
            <div className=" h-[25vh] sm:h-[40vh] w-full flex xl:justify-between justify-around gap-8">

                <div className="mt-20  md:w-[50vw] sm:block hidden">
                    <Input
                        placeholder="Search all Invoices ..."
                        value={globalFilter ?? ""}
                        onChange={(event) => setGlobalFilter(event.target.value)}
                        className="max-w-sm"
                    />

                </div>
                <InvoiceChart />
            </div>
            <div className="h-[60vh]">
                <InvoicesTable data={invoices} columns={Invoicescolumns} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
            </div>
        </div >
    )
}

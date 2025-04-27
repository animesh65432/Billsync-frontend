import { InvoicesTable, Invoicescolumns } from "@/components"
import { dummyInvoices } from "@/lib/utils"
import InvoiceChart from "./Invoices/InvoiceChart"
import { Input } from "@/components/ui/input"
import { useState } from "react"
export default function Dashboard() {
    const [globalFilter, setGlobalFilter] = useState<string>("")
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
                <InvoicesTable data={dummyInvoices} columns={Invoicescolumns} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
            </div>
        </div >
    )
}

import { InvoicesTable, Invoicescolumns } from "@/components"
import { dummyInvoices } from "@/lib/utils"
import InvoiceChart from "./Invoices/InvoiceChart"
import { MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import MobileSidebar from "./MobileSidebar"
import { useState } from "react"
export default function Dashboard() {
    const [globalFilter, setGlobalFilter] = useState<string>("")
    return (
        <div className="p-4  flex flex-col w-full h-[100vh]">
            <div className="h-[40vh] w-full flex xl:justify-between justify-around gap-8">
                <div className="xl:hidden block  font-bold">
                    <Sheet>
                        <SheetTrigger>
                            <MenuIcon className="h-8 w-8" />
                        </SheetTrigger>
                        <SheetContent>
                            <MobileSidebar />
                        </SheetContent>
                    </Sheet>
                </div>
                <div className="xl:mt-20">
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

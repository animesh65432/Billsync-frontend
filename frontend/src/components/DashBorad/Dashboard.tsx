import { InvoicesTable, Invoicescolumns } from "@/components"
import { dummyInvoices } from "@/pages/Dashborad"
import InvoiceChart from "./Invoices/InvoiceChart"
import { MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import MobileSidebar from "./MobileSidebar"
export default function Dashboard() {
    const PendingAmount = dummyInvoices.reduce(
        (acc, cur) => cur.status === "PENDING" ? acc + cur.amount : acc,
        0
    );
    const SucesseAmount = dummyInvoices.reduce(
        (acc, cur) => cur.status === "SUCCEED" ? acc + cur.amount : acc,
        0
    );

    return (
        <div className="p-4  flex flex-col w-full">
            <div className="h-[40vh] w-full flex justify-around gap-8">
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
                <div className="flex flex-col w-[50%] gap-4 xl:text-3xl sm:text-xl text-sm font-bold">

                    <ul className="flex gap-6">
                        <span >TOTAL INVOICES</span>
                        <span >
                            {dummyInvoices.length.toLocaleString()}</span>
                    </ul>
                    <ul className="flex gap-6">
                        <span >PENDING AMOUNT</span>
                        <span >
                            {PendingAmount}</span>
                    </ul>
                    <ul className="flex gap-6">
                        <span >SUCESSED AMOUNT</span>
                        <span >
                            {SucesseAmount}</span>
                    </ul>

                </div>
                <InvoiceChart />
            </div>
            <div className="h-[40vh]">
                <InvoicesTable data={dummyInvoices} columns={Invoicescolumns} />
            </div>
        </div>
    )
}

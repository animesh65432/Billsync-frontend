import { InvoicesTable, Invoicescolumns } from "@/components"
import { dummyInvoices } from "@/pages/Dashborad"
export default function Dashboard() {
    return (
        <div className="p-4">
            <InvoicesTable data={dummyInvoices} columns={Invoicescolumns} />
        </div>
    )
}

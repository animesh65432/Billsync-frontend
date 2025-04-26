import { useEffect, useState } from "react"
import { Sidebar, Dashboard, LoadinSpinner, } from "@/components"
import { GetInvoices } from "@/api/Invoices"
import { InvoicesTypes } from "@/types/index"
import { useStore } from "@/store"
export default function Dashborad() {
    const [loading, setloading] = useState<boolean>(false)
    const { setInvoiceStore, color } = useStore()

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
        <div className="grid grid-cols-12  h-[100vh] overflow-hidden">
            <div className={`hidden xl:block xl:col-span-1 border-r ${color ? "border-white" : "border-black"}  h-[100vh]`}>
                <Sidebar />
            </div>

            <div className="col-span-12 xl:col-span-11  h-[100vh]">
                <LoadinSpinner loading={loading} >
                    <Dashboard />
                </LoadinSpinner>
            </div>
        </div>
    )
}

import { useEffect, useState } from "react"
import { Dashboard, LoadinSpinner, } from "@/components"
import { GetInvoices } from "@/api/Invoices"
import { InvoicesTypes } from "@/types/index"
import { useStore } from "@/store"
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
        <LoadinSpinner loading={loading} >
            <Dashboard />
        </LoadinSpinner>
    )
}

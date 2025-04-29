import { useEffect, useState } from "react"
import { Dashboard, LoadinSpinner, } from "@/components"
import { GetInvoices } from "@/api/Invoices"
import { InvoicesTypes } from "@/types/index"
import { useStore } from "@/store"
export default function Dashborad() {
    const [loading, setloading] = useState<boolean>(false)
    const { setInvoiceStore, token } = useStore()

    async function init() {
        setloading(true)
        try {
            const Invoices = await GetInvoices(token) as InvoicesTypes[]
            setInvoiceStore(Invoices)
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

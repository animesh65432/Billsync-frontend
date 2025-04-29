import { GetInvoice } from "@/api/Invoices"
import { useState, useEffect } from "react"
import { InvoicesTypes } from "@/types"
import { useParams } from "react-router-dom"
import { LoadinSpinner } from "@/components"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, CreditCardIcon, UserIcon, BellIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useStore } from "@/store"

export default function ViewInvoice() {
    const [invoice, setInvoice] = useState<InvoicesTypes>()
    const [loading, setLoading] = useState<boolean>(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const { token } = useStore()

    async function getInvoice() {
        setLoading(true)
        try {
            const response = await GetInvoice(Number(id), token) as InvoicesTypes
            setInvoice(response)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!id) {
            navigate("/Dashborad")
            return
        }
        getInvoice()
    }, [])


    const formatDate = (date: Date) => {
        if (!date) return "";
        const d = new Date(date);
        return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <LoadinSpinner loading={loading}>
            <div className=" md:p-6 lg:p-9 flex justify-center w-full">
                <Card className="w-[60vw] shadow-lg mt-9">
                    <CardHeader className="border-b pb-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                            <CardTitle className="text-xl sm:text-2xl font-bold">Invoice Details</CardTitle>
                            {invoice && (
                                <Badge className={`text-sm px-3 py-1 ${invoice.status === "SUCCEED"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                    }`}>
                                    {invoice.status}
                                </Badge>
                            )}
                        </div>
                    </CardHeader>

                    {invoice && (
                        <CardContent className="pt-6 space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                                <div className="space-y-1">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <UserIcon size={16} className="mr-2" />
                                        Client
                                    </div>
                                    <p className="text-base sm:text-lg font-medium">{invoice.clientName}</p>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <CreditCardIcon size={16} className="mr-2" />
                                        Amount
                                    </div>
                                    <p className="text-base sm:text-lg font-medium">
                                        ${invoice.amount.toLocaleString('en-US', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })}
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <CalendarIcon size={16} className="mr-2" />
                                        Due Date
                                    </div>
                                    <p className="text-base sm:text-lg font-medium">{formatDate(invoice.dueDate)}</p>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <BellIcon size={16} className="mr-2" />
                                        Reminder Status
                                    </div>
                                    <div className="flex items-center">
                                        <div className={`h-3 w-3 rounded-full mr-2 ${invoice.reminderSent ? "bg-blue-500" : "bg-gray-300"
                                            }`}></div>
                                        <p className="text-base sm:text-lg font-medium">
                                            {invoice.reminderSent ? "Sent" : "Not Sent"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-4 mt-4">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Invoice ID</p>
                                        <p className="font-mono text-sm">#{invoice.id.toString().padStart(5, '0')}</p>
                                    </div>

                                    <div className="sm:text-right">
                                        <p className="text-sm text-gray-500">Status</p>
                                        <p className={`font-medium ${invoice.status === "SUCCEED" ? "text-green-600" : "text-yellow-600"
                                            }`}>
                                            {invoice.status}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    )}

                    <CardFooter className="flex flex-col sm:flex-row sm:justify-end gap-3 border-t pt-4">
                        <button className="w-full sm:w-auto px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition" onClick={() => navigate("/Dashborad")}>
                            Back
                        </button>

                    </CardFooter>
                </Card>
            </div>
        </LoadinSpinner>
    )
}
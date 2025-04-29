import { useParams } from "react-router-dom"
import { InvoicesTypes } from "@/types"
import { useEffect, useState } from "react"
import { GetInvoice, update } from "@/api/Invoices"
import { LoadinSpinner } from "@/components"
import { useForm } from "react-hook-form"
import { UpdateInvoiceSchema } from "@/schema"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { CalendarIcon } from "lucide-react"
import { Icons } from "@/Icon"
import { format } from "date-fns"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useStore } from "@/store"

type UpdateInvoiceTypes = z.infer<typeof UpdateInvoiceSchema>;

export default function UpdateInvoice() {
    const { id } = useParams()
    const invoiceid = Number(id)
    const [updateInvoiceLoading, setUpdateInvoiceLoading] = useState<boolean>(false)
    const [invoiceLoading, setInvoiceLoading] = useState<boolean>(false)
    const naivigate = useNavigate()
    const { token } = useStore()
    const form = useForm({
        resolver: zodResolver(UpdateInvoiceSchema),
        defaultValues: {
            clientName: "",
            Mail: "",
            dueDate: new Date(),
            amount: 0
        }
    })

    async function getInvoice() {
        setInvoiceLoading(true)
        try {
            const response = await GetInvoice(invoiceid, token) as InvoicesTypes
            form.reset({
                clientName: response.clientName || "",
                Mail: response.Mail || "",
                dueDate: new Date(response.dueDate) || new Date(),
                amount: response.amount || 0
            })
        } finally {
            setInvoiceLoading(false)
        }
    }

    useEffect(() => {
        getInvoice()
    }, [])

    const onSubmit = async (data: UpdateInvoiceTypes) => {
        setUpdateInvoiceLoading(true)
        try {
            await update(invoiceid, data.clientName, data.amount, data.dueDate, data.Mail, token)
            toast.success("sucessfully update it")
            naivigate("/Dashborad")
        } catch (error) {
            console.error("Failed to update invoice:", error)
        } finally {
            setUpdateInvoiceLoading(false)
        }
    }

    return (
        <LoadinSpinner loading={invoiceLoading}>
            <div className="h-full w-full flex justify-center items-center p-2 sm:mt-0 mt-20">
                <div className="w-full max-w-md rounded-lg h-[80vh]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                            <FormField
                                control={form.control}
                                name="clientName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Client Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter client name" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            The full name of your client.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="Mail"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="client@example.com" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Where the invoice will be sent.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dueDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col text-black">
                                        <FormLabel>Due Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={new Date(field.value)}
                                                    onSelect={field.onChange}
                                                    disabled={(date) => date < new Date()}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>

                                        <FormDescription>When payment is expected.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="0.00"
                                                value={field.value ?? ""}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Total invoice amount.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={updateInvoiceLoading}>
                                {updateInvoiceLoading ? <Icons.spinner className="animate-spin h-4 w-4" /> : "Update Invoice"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </LoadinSpinner>
    )
}
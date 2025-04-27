import { z } from "zod"
const InvoiceCreateForm = z.object({
    clientName: z.string().min(1, { message: "Client name is required" }),
    amount: z.number().min(0.01, { message: "Amount must be greater than zero" }),
    dueDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    Mail: z.string().email({ message: "Invalid email address" }),
})

export default InvoiceCreateForm
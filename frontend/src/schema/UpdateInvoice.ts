import z from "zod"

const UpdateInvoiceSchema = z.object({
    clientName: z.string().min(1, { message: "Client name is required" }),
    amount: z.number().min(0.01, { message: "Amount must be greater than zero" }),
    dueDate: z.date({ message: "date is required" }),
    Mail: z.string().email({ message: "Invalid email address" }),
})

export default UpdateInvoiceSchema
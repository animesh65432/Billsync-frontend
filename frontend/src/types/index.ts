export type InvoicesTypes = {
    clientName: string
    id: number,
    amount: number,
    status: "PENDING" | "SUCCEED",
    dueDate: Date,
    reminderSent: boolean
}
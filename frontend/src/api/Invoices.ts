import { Call } from "@/services/call"

export const GetInvoices = () => Call({
    path: "/Invoices/GetInvoices",
    method: "GET",

})
export const GetInvoice = (id: number) => Call({
    path: `/Invoices/GetInvoice?id=${id}`,
    method: "GET",

})

export const create = (clientName: string, amount: number, dueDate: Date, Mail: string) => Call({
    path: "/Invoices/create",
    request: { clientName, amount, dueDate, Mail },
    method: "POST",
})

export const update = (id: number, clientName: string, amount: number, dueDate: Date, Mail: string) => Call({
    path: `/Invoices/update?id=${id}`,
    request: { clientName, amount, dueDate, Mail },
    method: "PUT",

})

export const Delete = (id: number) => Call({
    path: `/Invoices/delete?id=${id}`,
    method: "DELETE",

})

export const markaspaid = (id: number) => Call({
    path: `/Invoices/markaspaid?id=${id}`,
    method: "PUT",

})
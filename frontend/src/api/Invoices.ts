import { Call } from "@/services/call"

export const GetInvoices = (auth_token: string) => Call({
    path: "/Invoices/GetInvoices",
    method: "GET",
    headers: {
        authorization: auth_token
    }
})
export const GetInvoice = (auth_token: string, id: number) => Call({
    path: `/Invoices/GetInvoice?id=${id}`,
    method: "GET",
    headers: {
        authorization: auth_token
    }
})

export const create = (clientName: string, amount: number, dueDate: Date, Mail: string, auth_token: string) => Call({
    path: "/Invoices/create",
    request: { clientName, amount, dueDate, Mail },
    method: "POST",
    headers: {
        authorization: auth_token
    }
})

export const update = (id: number, clientName: string, amount: number, dueDate: Date, Mail: string, auth_token: string) => Call({
    path: `/Invoices/GetInvoice?id=${id}`,
    request: { clientName, amount, dueDate, Mail },
    method: "PUT",
    headers: {
        authorization: auth_token
    }
})

export const Delete = (id: number, auth_token: string) => Call({
    path: `/Invoices/delete?id=${id}`,
    method: "DELETE",
    headers: {
        authorization: auth_token
    }
})

export const markaspaid = (id: number, auth_token: string) => Call({
    path: `/Invoices/markaspaid${id}`,
    method: "PUT",
    headers: {
        authorization: auth_token
    }
})
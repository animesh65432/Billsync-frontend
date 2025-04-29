import { Call } from "@/services/call"

export const GetInvoices = (auth_token: string) => Call({
    path: "/Invoices/GetInvoices",
    method: "GET",
    headers: {
        Authorization: auth_token
    }

})
export const GetInvoice = (id: number, auth_token: string) => Call({
    path: `/Invoices/GetInvoice?id=${id}`,
    method: "GET",
    headers: {
        Authorization: auth_token
    }

})

export const create = (clientName: string, amount: number, dueDate: Date, Mail: string, auth_token: string) => Call({
    path: "/Invoices/create",
    request: { clientName, amount, dueDate, Mail },
    method: "POST",
    headers: {
        Authorization: auth_token
    }
})

export const update = (id: number, clientName: string, amount: number, dueDate: Date, Mail: string, auth_token: string) => Call({
    path: `/Invoices/update?id=${id}`,
    request: { clientName, amount, dueDate, Mail },
    method: "PUT",
    headers: {
        Authorization: auth_token
    }

})

export const Delete = (id: number, auth_token: string) => Call({
    path: `/Invoices/delete?id=${id}`,
    method: "DELETE",
    headers: {
        Authorization: auth_token
    }

})

export const markaspaid = (id: number, auth_token: string) => Call({
    path: `/Invoices/markaspaid?id=${id}`,
    method: "PUT",
    headers: {
        Authorization: auth_token
    }

})
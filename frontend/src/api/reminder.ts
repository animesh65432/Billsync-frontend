import { Call } from "@/services/call"

export const sentreminder = (Id: number, auth_token: string) =>
    Call({
        path: `/remider/sentreminder?Id=${Id}`, method: "POST",
        headers: {
            authorization: auth_token
        }
    }
    )

export const getallremiders = (auth_token: string) =>
    Call({
        path: "/remider/getallremiders", method: "GET",
        headers: {
            authorization: auth_token
        }
    }) 

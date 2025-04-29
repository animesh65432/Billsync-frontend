import { Call } from "@/services/call"

export const sentreminder = (Id: number) =>
    Call({
        path: `/remider/sentreminder?Id=${Id}`, method: "POST",
        headers: {
            Authorization: auth_token
        }
    },

    )

export const getallremiders = (auth_token: string) =>
    Call({
        path: "/remider/getallremiders", method: "GET",
        headers: {
            Authorization: auth_token
        }

    }) 

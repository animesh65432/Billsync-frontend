import { Call } from "@/services/call"

export const sentreminder = (Id: number) =>
    Call({
        path: `/remider/sentreminder?Id=${Id}`, method: "POST",

    }
    )

export const getallremiders = () =>
    Call({
        path: "/remider/getallremiders", method: "GET",

    }) 

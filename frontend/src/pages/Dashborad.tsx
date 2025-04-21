import { Sidebar, Dashboard } from "@/components"
import { uselogintheuser } from "@/api/Users"
import { useEffect } from "react"

export default function Dashborad() {

    async function init() {
        const response = await uselogintheuser(
            "test@gmail.com",
            "testpassword"
        )
        console.log(response)
    }

    init()
    return (
        <div className="grid grid-cols-12">
            <div className="col-span-2 border-r border-black">
                <Sidebar />
                <h1>huygyug</h1>
            </div>
            <div className="col-span-10">
                <Dashboard />
            </div>
        </div>
    )
}

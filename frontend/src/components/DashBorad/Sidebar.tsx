import { useStore } from "@/store"
import { Home, LogOut, Plus, Sun, Moon } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function DashboardSidebar() {
    const { onchangecolor, color } = useStore()
    const naviagate = useNavigate()
    return (
        <>
            <div className="flex flex-col p-8  justify-around items-center h-full">
                <ul>
                    <Home onClick={() => naviagate("/Dashborad")} />
                </ul>
                <ul>
                    <Plus onClick={() => naviagate("/create-invoice")} />
                </ul>
                <ul onClick={onchangecolor}>
                    {color ? <Sun /> : <Moon />}
                </ul>
                <ul>
                    <LogOut />
                </ul>
            </div>
        </>
    )
}

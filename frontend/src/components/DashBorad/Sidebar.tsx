import { useStore } from "@/store"
import { Home, LogOut, Plus, Sun, Moon } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function DashboardSidebar() {
    const { onChangeColor, color, removetoken } = useStore()
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
                <ul onClick={onChangeColor}>
                    {color ? <Sun /> : <Moon />}
                </ul>
                <ul onClick={() => removetoken()}>
                    <LogOut />
                </ul>
            </div>
        </>
    )
}

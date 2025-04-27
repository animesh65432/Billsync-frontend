import { Home, Settings, LogOut, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function MobileSidebar() {
    const naviagte = useNavigate()
    return (
        <div className="flex flex-col p-4 items-center justify-evenly h-dvh">
            <ul><Home className="h-8 w-8" onClick={() => naviagte("/Dashborad")} /></ul>
            <ul><Plus className="h-8 w-8" onClick={() => naviagte("/create-invoice")} /></ul>
            <ul><Settings className="h-8 w-8" /></ul>
            <ul><LogOut className="h-8 w-8" /></ul>
        </div>
    )
}

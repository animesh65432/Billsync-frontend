import { useStore } from "@/store"
import { Home, LogOut, Plus, Sun, Moon } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function MobileSidebar() {
    const naviagte = useNavigate()
    const { color, onChangeColor, removetoken } = useStore()
    return (
        <div className="flex flex-col p-4 items-center justify-evenly h-dvh">
            <ul><Home className="h-[4vh] w-[4vw]" onClick={() => naviagte("/Dashborad")} /></ul>
            <ul><Plus className="h-[4vh] w-[4vw]" onClick={() => naviagte("/create-invoice")} /></ul>
            <ul onClick={onChangeColor}>{color ? <Sun className="h-[4vh] w-[4vw]" /> : <Moon className="h-[4vh] w-[4vw]" />}</ul>
            <ul onClick={() => removetoken()}><LogOut className="h-[4vh] w-[4vw]" /></ul>
        </div>
    )
}

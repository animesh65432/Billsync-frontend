import { useStore } from "@/store"
import { Home, FileText, Mail, Settings, LogOut, Plus, Sun, Moon } from "lucide-react"


export default function DashboardSidebar() {
    const { onchangecolor, color } = useStore()
    return (
        <>
            <div className="flex flex-col p-8  justify-around items-center h-full">
                <ul>
                    <Home />
                </ul>
                <ul>
                    <FileText />
                </ul>
                <ul>
                    <Plus />
                </ul>
                <ul>
                    <Mail />
                </ul>
                <ul>
                    <Settings />
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

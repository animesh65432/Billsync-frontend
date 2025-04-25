import { Home, FileText, Mail, Settings, LogOut, Plus } from "lucide-react"


export default function MobileSidebar() {
    return (
        <div className="flex flex-col p-4 items-center justify-evenly h-dvh">
            <ul><Home className="h-8 w-8" /></ul>
            <ul><FileText className="h-8 w-8" /></ul>
            <ul><Plus className="h-8 w-8" /></ul>
            <ul><Mail className="h-8 w-8" /></ul>
            <ul><Settings className="h-8 w-8" /></ul>
            <ul><LogOut className="h-8 w-8" /></ul>
        </div>
    )
}

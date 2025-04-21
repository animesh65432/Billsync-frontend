import { Icons } from "@/Icon"
export default function DashboardSidebar() {
    return (
        <div className="flex flex-col p-8 h-dvh justify-around items-center">
            <div><Icons.Dashboard /></div>
            <div className="relative h-[4vh] w-[4vw]">
                <img src="./dashbord/invoice.jpg" />
            </div>
            <div className="h-[2]">

            </div>
            <div>

            </div>
            <div><Icons.settings /></div>
            <div><Icons.Logout /></div>
        </div>
    )
}

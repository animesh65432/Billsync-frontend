import { ReactNode } from "react"
import { Sidebar } from "@/components"
import { useStore } from "@/store"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { MobileSidebar } from "@/components"
import { MenuIcon } from "lucide-react"


type Props = {
    children: ReactNode
}

export default function MainLayout({ children }: Props) {
    const { color } = useStore()
    return (
        <div className="grid grid-cols-12 h-screen overflow-hidden">
            <div className={`hidden xl:block xl:col-span-1 border-r ${color ? "border-white" : "border-black"} h-screen`}>
                <Sidebar />
            </div>

            <div className="col-span-12 xl:col-span-11 h-screen relative">
                <div className="xl:hidden fixed top-4 left-4 z-50">
                    <Sheet >
                        <SheetTrigger>
                            <button className="p-2 rounded-md hover:bg-gray-100">
                                <MenuIcon className="h-6 w-6" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="left" className={`${color ? "bg-black text-white" : "bg-white text-black"}`}>
                            <MobileSidebar />
                        </SheetContent>
                    </Sheet>
                </div>


                <div className="h-full overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}
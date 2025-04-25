import { useStore } from "@/store"
import { ReactNode } from "react"
type Props = {
    children: ReactNode
}
export default function ThemeColorProvider({ children }: Props) {
    const { color } = useStore()
    return (
        <div className={color ? "bg-black text-white" : "bg-white text-black"}>
            {children}
        </div>
    )
}

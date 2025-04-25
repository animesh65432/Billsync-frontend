import { ReactNode } from "react"
import { Icons } from "@/Icon"
type Props = {
    children: ReactNode,
    loading: boolean
}

export default function LoadinSpinner({ children, loading }: Props) {
    if (loading) {
        return <div className="flex h-[100vh] justify-center items-center">
            <Icons.spinner className=" h-10 w-10 animate-spin" />
        </div>
    }
    return (
        <>{children}</>
    )
}

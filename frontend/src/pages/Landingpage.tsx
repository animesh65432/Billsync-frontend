import { Button } from "@/components/ui/button"
import { Icons } from "@/Icon"
import { useNavigate } from "react-router-dom"

export default function LandingPage() {
    let navigate = useNavigate();
    const naiviagate_to = () => {
        navigate("/singin")
    }
    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white font-mono flex flex-col items-center">
            <header className="w-full max-w-7xl px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img src="/icon.png" className="h-8 w-8 rounded-md" alt="Logo" />
                    <span className="text-xl font-bold uppercase tracking-wide">DueTrack</span>
                </div>
                <Button className="bg-white text-black hover:bg-slate-200 transition" onClick={naiviagate_to}>
                    <span>Get Started</span>
                    <span className="ml-2"><Icons.ArrowUpRight /></span>
                </Button>
            </header>

            <main className="flex flex-1 flex-col justify-center items-center text-center px-4 py-12 gap-6 max-w-3xl">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
                    Automate payment <br />
                    <span className="text-green-300">follow-ups like a pro</span>
                </h1>
                <p className="text-base sm:text-lg text-gray-300 max-w-xl">
                    Never miss a payment follow-up again. BillSync keeps your cash flow in check with smart, automated reminders.
                </p>
                <Button className="mt-4 bg-green-300 text-black hover:bg-green-400 transition duration-300" onClick={naiviagate_to}>
                    <span onClick={naiviagate_to}>Start Now</span>
                    <span className="ml-2"><Icons.ArrowUpRight /></span>
                </Button>
            </main>
        </div>
    )
}

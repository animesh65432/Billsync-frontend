import { LoginSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { uselogintheuser, loginwithgoogle } from "@/api/Users"
import { useState } from "react";
import { Icons } from "@/Icon"
import { toast } from "react-toastify"
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useStore } from "@/store"

type LoginTypes = z.infer<typeof LoginSchema>;

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginTypes>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "test@gmail.com",
            Password: "testpassword",
        },
    });
    const [loading, setloading] = useState<boolean>(false)
    const navigate = useNavigate()
    const { addtoken } = useStore()

    const onSubmit = async (data: LoginTypes) => {
        setloading(true)
        try {
            const response = await uselogintheuser(data.email, data.Password) as { token: string, message: string };
            navigate("/Dashborad")
            addtoken(response.token)
            toast.success(`${response.message}`)
        } catch (error) {
            console.log(error)
        }
        finally {
            setloading(false)
        }
    };

    const googlelogin = async (data: CredentialResponse) => {
        console.log(data)
        if (!data.credential || !data.clientId) {
            console.error('Missing Google credential or client ID');
            return;
        }
        try {
            const response = await loginwithgoogle(data.clientId, data.credential) as { token: string, message: string };
            navigate("/Dashborad")
            addtoken(response.token)
            toast.success(`${response.message}`)
        } catch (error) {
            console.error(error);
            toast.error("something went wrong")
        }
    };


    return (
        <div className="grid md:grid-cols-2 grid-cols-1 min-h-screen">
            <div className="bg-white text-black flex flex-col items-center justify-center px-6 py-12">
                <div className="w-[60vw] h-[20vh] md:w-[60vw] md:h-[60vh] mb-8">
                    <img src="./signinpage.png" alt="Sign In" className="w-full h-full object-contain" />
                </div>
                <div className="text-center space-y-2  font-medium">
                    <p className="font-bold lg:text-2xl text-xl">Users shouldn't feel left out</p>
                    <p className="lg:text-lg text-sm">
                        Use DueTrack, and make them feel special
                    </p>
                </div>
            </div>

            <div className="bg-black text-white flex items-center justify-center px-6 py-12">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-6">
                    <h2 className="text-3xl font-semibold text-center">Login to your account</h2>

                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            {...register("email")}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"

                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-1">Password</label>
                        <input
                            type="password"
                            {...register("Password")}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"

                        />
                        {errors.Password && <p className="text-red-500 text-sm mt-1">{errors.Password.message}</p>}
                    </div>
                    <div className=" w-full  justify-center flex flex-col items-center gap-4">
                        <Button className="bg-white text-black hover:bg-amber-50 w-[30%]" disabled={loading}>{loading ? <Icons.spinner className="animate-spin" /> : "Continue"}</Button>
                        <div>Don't have an account?<Link to="/singup"><span className="underline"> Signup</span></Link></div>
                    </div>
                    <div className="w-[60%] m-auto">
                        <GoogleLogin onSuccess={(data) => googlelogin(data)} />
                    </div>
                </form>
            </div>
        </div >
    );
}
import { Call } from "@/services/call"


export const usesinguptheuser = (name: string, email: string, Password: string) => Call({
    path: "/users/singup",
    method: "POST",
    request: {
        name,
        email,
        Password
    },

})

export const uselogintheuser = (email: string, Password: string) => Call({
    path: "/users/login",
    method: "POST",
    request: {
        Password,
        email
    }
});


import { InvoiceCreateForm } from "@/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


type InvoiceCreateFormtype = z.infer<typeof InvoiceCreateForm>

export default function CreateFrom() {
    const { register, handleSubmit, formState: { errors } } = useForm<InvoiceCreateFormtype>({
        resolver: zodResolver(InvoiceCreateForm)
    })
    return (
        <div>CreateFrom</div>
    )
}

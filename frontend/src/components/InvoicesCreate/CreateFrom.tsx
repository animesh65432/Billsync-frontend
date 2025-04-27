import { InvoiceCreateForm } from "@/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"


type InvoiceCreateFormtype = z.infer<typeof InvoiceCreateForm>

export default function CreateFrom() {
    const form = useForm<InvoiceCreateFormtype>({
        resolver: zodResolver(InvoiceCreateForm)
    })

    const onSubmit = (data: InvoiceCreateFormtype) => {
        console.log(data)
    }
    return (
        <div className=" h-full w-full flex justify-center items-center p-2 sm:mt-0 mt-20">
            <div className="w-full max-w-md rounded-lg   h-[80vh] ">
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField
                            control={form.control}
                            name="clientName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Client Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter client name" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        The full name of your client.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Mail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="client@example.com" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Where the invoice will be sent.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField

                            control={form.control}
                            name="dueDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col text-black">
                                    <FormLabel>Due Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full h-10 px-3 py-2 text-left font-normal bg-background border border-input rounded-md",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(new Date(field.value), "PPP")
                                                    ) : (
                                                        <span>Select a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                onSelect={field.onChange}
                                                initialFocus
                                                selected={field.value ? new Date(field.value) : undefined}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        When payment is expected.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="0.00"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Total invoice amount.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" >Create Invoice</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

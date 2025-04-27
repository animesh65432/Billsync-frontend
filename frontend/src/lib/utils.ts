import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { InvoicesTypes } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const dummyInvoices: InvoicesTypes[] = [
  {
    clientName: "Alice Johnson",
    id: 1,
    amount: 250.5,
    status: "PENDING",
    dueDate: new Date("2025-04-30"),
    reminderSent: false,
  },
  {
    clientName: "Bob Smith",
    id: 2,
    amount: 1000,
    status: "SUCCEED",
    dueDate: new Date("2025-03-15"),
    reminderSent: true,
  },
  {
    clientName: "Clara Wilson",
    id: 3,
    amount: 475.75,
    status: "PENDING",
    dueDate: new Date("2025-05-10"),
    reminderSent: false,
  },
  {
    clientName: "Daniel Kim",
    id: 4,
    amount: 850.25,
    status: "SUCCEED",
    dueDate: new Date("2025-02-20"),
    reminderSent: true,
  },
  {
    clientName: "Evelyn Parker",
    id: 5,
    amount: 320,
    status: "PENDING",
    dueDate: new Date("2025-04-25"),
    reminderSent: true,
  },
];
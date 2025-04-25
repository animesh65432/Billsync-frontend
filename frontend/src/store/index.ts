import { create } from "zustand";
import { InvoicesTypes } from "@/types";

type Store = {
    invoices: InvoicesTypes[];
    setInvoiceStore: (invoices: InvoicesTypes[]) => void;
    color: boolean;
    onchangecolor: () => void;
};

export const useStore = create<Store>((set) => ({
    invoices: [],
    setInvoiceStore: (invoices) => set({ invoices }),
    color: typeof window !== "undefined" && localStorage.getItem("color") === "true",
    onchangecolor: () =>
        set((state) => {
            console.log("clicked")
            const newColor = !state.color;
            if (typeof window !== "undefined") {
                localStorage.setItem("color", JSON.stringify(newColor));
            }
            return { color: newColor };
        }),
}));

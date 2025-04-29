import { create } from "zustand";
import { InvoicesTypes } from "@/types";

type Store = {
    invoices: InvoicesTypes[];
    setInvoiceStore: (invoices: InvoicesTypes[]) => void;
    deleteinvoice: (id: number) => void;
    makeinvoicePaidInvoice: (id: number) => void,
    color: boolean;
    onChangeColor: () => void;
    token: string;
    addtoken: (token: string) => void;
    removetoken: () => void;

};

const getInitialColor = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("color") === "true";
    }
    return false;
};

const getInitialToken = () => {
    if (typeof window !== "undefined") {
        return JSON.parse(localStorage.getItem("token") || '""');
    }
    return "";
};

export const useStore = create<Store>((set) => ({
    invoices: [],
    setInvoiceStore: (invoices) => set({ invoices }),
    deleteinvoice: (id) => set((state) => {
        const invoices = state.invoices
        const deleteinvoice = invoices.filter((invoice) => invoice.id !== id)
        return {
            invoices: deleteinvoice
        }
    }),
    makeinvoicePaidInvoice: (id) => set((state) => ({
        invoices: state.invoices.map((invoice) =>
            invoice.id === id
                ? { ...invoice, status: "SUCCEED" }
                : invoice
        )
    })),
    color: getInitialColor(),
    onChangeColor: () =>
        set((state) => {
            const newColor = !state.color;
            if (typeof window !== "undefined") {
                localStorage.setItem("color", JSON.stringify(newColor));
            }
            return { color: newColor };
        }),

    token: getInitialToken(),
    addtoken: (token) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("token", JSON.stringify(token));
        }
        set({ token });
    },
    removetoken: () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
        }
        set({ token: "" });
    },
}));

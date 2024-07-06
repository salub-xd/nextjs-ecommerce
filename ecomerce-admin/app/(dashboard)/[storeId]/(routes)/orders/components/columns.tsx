"use client";

import { ColumnDef } from "@tanstack/react-table"

export type OrderColumn = {
    id: string
    isPaid: boolean
    phone: string
    address: string
    totalPrice:string
    products:string
    createdAt: string
}

export const columns: ColumnDef<OrderColumn>[] = [
    {
        accessorKey: "products",
        header: "Product",
    },
    {
        accessorKey: "totalPrice",
        header: "Price",
    },
    {
        accessorKey: "isPaid",
        header: "Paid",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },

]

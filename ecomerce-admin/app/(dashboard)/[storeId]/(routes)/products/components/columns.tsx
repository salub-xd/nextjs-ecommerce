"use client";

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
import Image from "next/image";

export type ProductColumn = {
    id: string
    name: string
    price: string
    size: string
    color: string
    colorValue:string
    category: string
    isFeatured: boolean
    isArchived: boolean
    createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "price",
        header: "price",
    },
    {
        accessorKey: "size",
        header: "size",
    },
    {
        accessorKey: "color",
        header: "Color",
        cell: ({ row }) => (
            <div className="flex items-center space-x-2">
                <p>{row.original.color}</p>
                <div className=" rounded-full w-5 h-5 border" style={{ backgroundColor: row.original.colorValue }} />
            </div>
        )
    },
    {
        accessorKey: "category",
        header: "category",
    },
    {
        accessorKey: "isFeatured",
        header: "isFeatured",
    },
    {
        accessorKey: "isArchived",
        header: "isArchived",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />
    }
]

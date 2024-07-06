"use client";

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
import Image from "next/image";

export type ColorColumn = {
    id: string
    name: string
    value: string
    createdAt: string
}

export const columns: ColumnDef<ColorColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "value",
        header: "Value",
        cell: ({ row }) => (
            <div className="flex items-center">
                <div className=" rounded-full w-10 h-10 border" style={{ backgroundColor: row.original.value }} />
            </div>
        )
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

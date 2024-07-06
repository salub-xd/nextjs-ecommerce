"use client";

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
import Image from "next/image";

export type CategoryColumn = {
    id: string
    name: string
    billboardLabel: string
    billboardImage: string
    createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "billboardLabel",
        header: "Billboad Label",
    },
    {
        accessorKey: "billboardImage",
        header: "Billboad Image",
        cell: ({ row }) => (
            <div className="flex items-center">
                <Image
                    src={row.original.billboardImage}
                    className="rounded border object-cover"
                    alt="Image"
                    width={80}
                    height={80}
                />
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

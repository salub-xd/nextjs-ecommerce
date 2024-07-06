"use client";

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
import Image from "next/image";

export type BillboardColumn = {
    id: string
    label: string
    imageUrl: string
    createdAt: string
}

export const columns: ColumnDef<BillboardColumn>[] = [
    {
        accessorKey: "label",
        header: "Label",
    },
    {
        accessorKey: "imageUrl",
        header: "Image",
        cell: ({ row }) => (
            <div className="flex items-center">
                <Image
                    src={row.original.imageUrl}
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

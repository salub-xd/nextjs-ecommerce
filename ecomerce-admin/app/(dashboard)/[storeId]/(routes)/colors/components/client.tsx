'use client';

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Plus } from "lucide-react"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ColorColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from '@/hooks/use-origin';
import ApiList from "@/components/ui/api-list";

interface ColorClientProps {
    data: ColorColumn[];
}

export const ColorClient: React.FC<ColorClientProps> = ({
    data
}) => {

    const router = useRouter();
    const params = useParams();
    const origin = useOrigin();

    // const [loading, setLoading] = useState(false);

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Colors (${data.length})`}
                    description="Manage color preferences"
                />
                <Button
                    onClick={() => router.push(`/${params.storeId}/colors/new`)}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey={"label"} />
            <Separator />
            <ApiList entityName="colors" entityIdName="colorId" />
        </>
    )
}

'use client';

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Plus } from "lucide-react"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { BillboardColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface BillboardClientProps {
    data: BillboardColumn[];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({
    data
}) => {

    const router = useRouter();
    const params = useParams();

    // const [loading, setLoading] = useState(false);

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Billboards (${data.length})`}
                    description="Manage billboard preferences"
                />
                <Button
                    onClick={() => router.push(`/${params.storeId}/billboards/new`)}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey={"label"} />
            <Separator />
            <ApiList entityName="billboards" entityIdName="billboardId" />
        </>
    )
}

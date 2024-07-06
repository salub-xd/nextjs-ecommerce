'use client';

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Plus } from "lucide-react"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { OrderColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from '@/hooks/use-origin';
import ApiList from "@/components/ui/api-list";

interface OrderClientProps {
    data: OrderColumn[];
}

export const OrderClient: React.FC<OrderClientProps> = ({
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
                    title={`Orders (${data.length})`}
                    description="Manage order preferences"
                />
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey={"prodects"} />
        </>
    )
}

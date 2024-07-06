"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface ApiAlertProps {
    title: string;
    description: string,
    variant: 'public' | 'admin'
};

const textMap: Record<ApiAlertProps['variant'], string> = {
    public: "Public",
    admin: "Admin"
};

const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
    public: "secondary",
    admin: "destructive"
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
    title,
    description,
    variant = 'public',
}) => {

    const onCopy = () => {
        navigator.clipboard.writeText(description);
        toast.success('API Route copied to the clipboard.')
    }

    return (
        <Alert>
            <AlertTitle className="flex justify-start items-center gap-x-2 ">
            <Server className="h-4 w-4" />
                {title}
                <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
            </AlertTitle>
            <AlertDescription className="mt-4 gap-x-4 flex items-center justify-between">
                <code className="relative rounded break-all bg-muted px-[0.3rem] font-mono text-xs md:font-semibold font-light md:text-sm">
                    {description}
                </code>
                <Button variant={'outline'} size={'icon'} onClick={onCopy} className="px-2">
                    <Copy className="h-4 w-4" />
                </Button>
            </AlertDescription>
        </Alert>
    )
}
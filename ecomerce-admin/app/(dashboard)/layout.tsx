import { auth } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";

import Navbar from "@/components/navbar";

export default async function Dashboard({
    children
}: { children: React.ReactNode }) {
    const { userId } = auth();

    if (!userId) {
        redirect(`/sign-in`);
    }
    
    const store = await prisma?.store.findFirst({
        where: {
            userId
        }
    });

    if (!store) {
        redirect('/');
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}
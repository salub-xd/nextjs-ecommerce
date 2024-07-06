import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { userId } = auth();
        const { label, imageUrl } = await req.json();

        if (!userId) {
            return NextResponse.json('Unauthorized', { status: 400 });
        }

        if (!label) {
            return NextResponse.json('Label is required', { status: 400 });
        }

        if (!imageUrl) {
            return NextResponse.json('Image Url is required', { status: 400 });
        }

        if (!params.storeId) {
            return NextResponse.json('Store Id is required', { status: 400 });
        }

        const storeByUserId = await prismadb.store.findUnique({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return NextResponse.json('Unauthorized', { status: 400 });
        }

        const billboard = await prismadb.billboard.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId
            }
        });

        // console.log(billboard);
        return NextResponse.json(billboard);

    } catch (error) {
        console.log(`BILLBOARDS_POST: ${error}`);
        return NextResponse.json(error, { status: 400 });
    }
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {

        if (!params.storeId) {
            return new NextResponse('Store id is required', { status: 401 });
        }

        const billboards = await prismadb?.billboard.findMany({
            where: {
                storeId: params.storeId,
            }
        })

        return NextResponse.json(billboards);

    } catch (error) {
        console.log('[BILLBOARDS_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }

}
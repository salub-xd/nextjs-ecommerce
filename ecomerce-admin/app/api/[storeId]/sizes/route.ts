import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { userId } = auth();
        const { name, value } = await req.json();

        if (!userId) {
            return NextResponse.json('Unauthorized', { status: 400 });
        }

        if (!name) {
            return NextResponse.json('Name is required', { status: 400 });
        }

        if (!value) {
            return NextResponse.json('Size Value is required', { status: 400 });
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

        const size = await prismadb.size.create({
            data: {
                name,
                value,
                storeId: params.storeId
            }
        });

        // console.log(size);
        return NextResponse.json(size);

    } catch (error) {
        console.log(`SIZES_POST: ${error}`);
        return NextResponse.json(error, { status: 400 });
    }
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {

        if (!params.storeId) {
            return new NextResponse('Store id is required', { status: 401 });
        }

        const sizes = await prismadb?.size.findMany({
            where: {
                storeId: params.storeId,
            }
        })

        return NextResponse.json(sizes);

    } catch (error) {
        console.log('[SIZES_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }

}
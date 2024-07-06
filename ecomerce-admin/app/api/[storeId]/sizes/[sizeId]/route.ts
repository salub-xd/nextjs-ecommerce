import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { storeId: string, sizeId: string } }) {
    try {

        if (!params.sizeId) {
            return NextResponse.json('Size Id is required', { status: 400 });
        }

        const size = await prismadb.size.findUnique({
            where: {
                id: params.sizeId
            }
        });

        // console.log(size);
        return NextResponse.json(size);

    } catch (error) {
        console.log(`SIZE_GET: ${error}`);
        return NextResponse.json(error, { status: 400 });
    }
}

export async function PATCH(req: Request, { params }: { params: { storeId: string, sizeId: string } }) {
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

        if (!params.sizeId) {
            return NextResponse.json('Size Id is required', { status: 400 });
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

        const size = await prismadb.size.updateMany({
            where: {
                id: params.sizeId
            },
            data: {
                name,
                value,
            }
        });

        // console.log(size);
        return NextResponse.json(size);

    } catch (error) {
        console.log(`SIZE_PATCH: ${error}`);
        return NextResponse.json(error, { status: 400 });
    }
}

export async function DELETE(req: Request, { params }: { params: { storeId: string, sizeId: string } }) {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json('Unauthorized', { status: 400 });
        }

        if (!params.sizeId) {
            return NextResponse.json('Size Id is required', { status: 400 });
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

        const size = await prismadb.size.deleteMany({
            where: {
                id: params.sizeId
            }
        });

        // console.log(size);
        return NextResponse.json(size);

    } catch (error) {
        console.log(`SIZE_DELETE: ${error}`);
        return NextResponse.json(error, { status: 400 });
    }
}
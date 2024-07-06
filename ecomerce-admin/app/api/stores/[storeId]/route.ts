import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {

        const { userId } = auth();
        const { storeId } = params;

        if (!userId) {
            return NextResponse.json('Unauthorized', { status: 400 });
        }

        if (!storeId) {
            return NextResponse.json('Store Id is required', { status: 400 });
        }

        const store = await prismadb.store.findUnique({
            where: {
                id: params.storeId,
            },
        });

        console.log(store);
        return NextResponse.json(store);

    } catch (error) {
        console.log(`STORE_GET: ${error}`);
        return NextResponse.json(error, { status: 400 });
    }
}

export async function PATCH(req: Request, { params }: { params: { storeId: string } }) {
    try {

        const { userId } = auth();
        const { storeId } = params;
        const { name } = await req.json();

        if (!userId) {
            return NextResponse.json('Unauthorized', { status: 400 });
        }
        if (!storeId) {
            return NextResponse.json('Store Id is required', { status: 400 });
        }

        if (!name) {
            return NextResponse.json('Name is required', { status: 400 });
        }

        const store = await prismadb.store.updateMany({
            where: {
                id: storeId,
                userId
            },
            data: {
                name,
            }
        });

        console.log(store);
        return NextResponse.json(store);

    } catch (error) {
        console.log(`STORE_PATCH: ${error}`);
        return NextResponse.json(error, { status: 400 });
    }
}

export async function DELETE(req: Request, { params }: { params: { storeId: string } }) {
    try {

        const { userId } = auth();
        const { storeId } = params;

        if (!userId) {
            return NextResponse.json('Unauthorized', { status: 400 });
        }
        if (!storeId) {
            return NextResponse.json('Store Id is required', { status: 400 });
        }

        const store = await prismadb.store.deleteMany({
            where: {
                id: storeId,
                userId
            },
        });

        console.log(store);
        return NextResponse.json(store);

    } catch (error) {
        console.log(`STORE_DELETE: ${error}`);
        return NextResponse.json(error, { status: 400 });
    }
}
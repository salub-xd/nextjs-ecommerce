import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { storeId: string, colorId: string } }) {
    try {

        if (!params.colorId) {
            return NextResponse.json('Size Id is required', { status: 400 });
        }

        const color = await prismadb.color.findUnique({
            where: {
                id: params.colorId
            }
        });

        // console.log(color);
        return NextResponse.json(color);

    } catch (error) {
        console.log(`COLOR_GET: ${error}`);
        return NextResponse.json(error, { status: 400 });
    }
}

export async function PATCH(req: Request, { params }: { params: { storeId: string, colorId: string } }) {
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
            return NextResponse.json('Color Value is required', { status: 400 });
        }

        if (!params.colorId) {
            return NextResponse.json('Color Id is required', { status: 400 });
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

        const color = await prismadb.color.updateMany({
            where: {
                id: params.colorId
            },
            data: {
                name,
                value,
            }
        });

        // console.log(color);
        return NextResponse.json(color);

    } catch (error) {
        console.log(`COLOR_PATCH: ${error}`);
        return NextResponse.json(error, { status: 400 });
    }
}

export async function DELETE(req: Request, { params }: { params: { storeId: string, colorId: string } }) {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json('Unauthorized', { status: 400 });
        }

        if (!params.colorId) {
            return NextResponse.json('Color Id is required', { status: 400 });
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

        const color = await prismadb.color.deleteMany({
            where: {
                id: params.colorId
            }
        });

        // console.log(color);
        return NextResponse.json(color);

    } catch (error) {
        console.log(`COLOR_DELETE: ${error}`);
        return NextResponse.json(error, { status: 400 });
    }
}
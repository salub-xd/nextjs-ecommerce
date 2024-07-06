import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { storeId: string, categoryId: string } }) {
    try {

        if (!params.categoryId) {
            return NextResponse.json('Category Id is required', { status: 400 });
        }

        const category = await prismadb.category.findUnique({
            where: {
                id: params.categoryId
            },
            include:{
                billboard:true
            }
        });

        // console.log(category);
        return NextResponse.json(category);

    } catch (error) {
        console.log(`CATEGORY_GET: ${error}`);
        return NextResponse.json(error, { status: 400 });
    }
}

export async function PATCH(req: Request, { params }: { params: { storeId: string, categoryId: string } }) {
    try {
        const { userId } = auth();
        const { name, billboardId } = await req.json();

        if (!userId) {
            return NextResponse.json('Unauthorized', { status: 400 });
        }

        if (!name) {
            return NextResponse.json('Name is required', { status: 400 });
        }

        if (!billboardId) {
            return NextResponse.json('Billboard Id is required', { status: 400 });
        }

        if (!params.categoryId) {
            return NextResponse.json('Category Id Id is required', { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return NextResponse.json('Unauthorized', { status: 400 });
        }

        const category = await prismadb.category.updateMany({
            where: {
                id: params.categoryId
            },
            data: {
                name,
                billboardId,
            }
        });

        // console.log(category);
        return NextResponse.json(category);

    } catch (error) {
        console.log(`CATEGORY_PATCH: ${error}`);
        return NextResponse.json(error, { status: 400 });
    }
}


export async function DELETE(req: Request, { params }: { params: { storeId: string, categoryId: string } }) {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json('Unauthorized', { status: 400 });
        }

        if (!params.categoryId) {
            return NextResponse.json('Category Id is required', { status: 400 });
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

        const billboard = await prismadb.category.deleteMany({
            where: {
                id: params.categoryId
            }
        });

        // console.log(billboard);
        return NextResponse.json(billboard);

    } catch (error) {
        console.log(`CATEGORY_DELETE: ${error}`);
        return NextResponse.json(error, { status: 400 });
    }
}
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: { storeId: string, billboardId: string } }) {
    try {

        if (!params.billboardId) {
            return NextResponse.json('Billboard Id is required', { status: 400 });
        }

        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: params.billboardId
            }
        });

        // console.log(billboard);
        return NextResponse.json(billboard);

    } catch (error) {
        console.log(`BILLBOARD_GET: ${error}`);
        return NextResponse.json(error, { status: 400 });
    }
}

export async function PATCH(req: Request, { params }: { params: { storeId: string, billboardId: string } }) {
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

        if (!params.billboardId) {
            return NextResponse.json('Billboard Id is required', { status: 400 });
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

        const billboard = await prismadb.billboard.updateMany({
            where: {
                id: params.billboardId
            },
            data: {
                label,
                imageUrl,
            }
        });

        // console.log(billboard);
        return NextResponse.json(billboard);

    } catch (error) {
        console.log(`BILLBOARD_PATCH: ${error}`);
        return NextResponse.json(error, { status: 400 });
    }
}


export async function DELETE(req: Request, { params }: { params: { storeId: string, billboardId: string } }) {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json('Unauthorized', { status: 400 });
        }

        if (!params.billboardId) {
            return NextResponse.json('Billboard Id is required', { status: 400 });
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

        const billboard = await prismadb.billboard.deleteMany({
            where: {
                id: params.billboardId
            }
        });

        // console.log(billboard);
        return NextResponse.json(billboard);

    } catch (error) {
        console.log(`BILLBOARD_DELETE: ${error}`);
        return NextResponse.json(error, { status: 400 });
    }
}
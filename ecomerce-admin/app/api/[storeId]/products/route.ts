import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { userId } = auth();
        const { name, images, price, isFeatured, isArchived, categoryId, sizeId, colorId } = await req.json();

        if (!userId) {
            return NextResponse.json('Unauthorized', { status: 400 });
        }

        if (!name) {
            return NextResponse.json('Name is required', { status: 400 });
        }

        if (!price) {
            return NextResponse.json('Price is required', { status: 400 });
        }
        if (!images) {
            return NextResponse.json('Images is required', { status: 400 });
        }
        if (!categoryId) {
            return NextResponse.json('Category Id is required', { status: 400 });
        }
        if (!sizeId) {
            return NextResponse.json('Size Id is required', { status: 400 });
        }
        if (!colorId) {
            return NextResponse.json('Color Id is required', { status: 400 });
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

        const product = await prismadb.product.create({
            data: {
                name,
                price,
                isArchived,
                isFeatured,
                categoryId,
                sizeId,
                colorId,
                storeId: params.storeId,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                }
            }
        });

        // console.log(product);
        return NextResponse.json(product);

    } catch (error) {
        console.log(`PRODUCTS_POST: ${error}`);
        return NextResponse.json(error, { status: 400 });
    }
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {

        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get('categoryId') || undefined;
        const colorId = searchParams.get('colorId') || undefined;
        const sizeId = searchParams.get('sizeId') || undefined;
        const isFeatured = searchParams.get('isFeatured') || undefined;

        if (!params.storeId) {
            return new NextResponse('Store id is required', { status: 401 });
        }

        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                colorId: colorId,
                sizeId: sizeId,
                categoryId: categoryId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false
            },
            include: {
                images: true,
                category: true,
                color: true,
                size: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(products);

    } catch (error) {
        console.log('[PRODUCTS_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }

}
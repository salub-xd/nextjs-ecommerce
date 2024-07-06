import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: { productId: string, storeId: string } }) {
    try {

        const { userId } = auth();

        if (userId) {
            return new NextResponse('Unathorized', { status: 401 });
        }
        if (!params.productId) {
            return new NextResponse('Store id is required', { status: 401 });
        }

        const products = await prismadb.product.findUnique({
            where: {
                id: params.productId,
            },
            include: {
                images: true,
                category: true,
                color: true,
                size: true,
            },
        })

        return NextResponse.json(products);

    } catch (error) {
        console.log('[PRODUCT_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }

}

export async function PATCH(req: Request, { params }: { params: {productId:string, storeId: string } }) {
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

       await prismadb.product.update({
            where:{
                id:params.productId
            },
            data: {
                name,
                price,
                categoryId,
                sizeId,
                colorId,
                storeId: params.storeId,
                images: {
                    deleteMany: {}
                },
                isArchived,
                isFeatured,
            }
        });

        const product = await prismadb.product.update({
            where:{
                id:params.productId
            },
            data:{
                images:{
                    createMany:{
                        data:[
                            ...images.map((image:{url:string})=>image)
                        ]
                    }
                }
            }
         });

        // console.log(product);
        return NextResponse.json(product);

    } catch (error) {
        console.log(`PRODUCT_PATCH: ${error}`);
        return NextResponse.json(error, { status: 400 });
    }
}


export async function DELETE(req: Request, { params }: { params: { storeId: string, productId: string } }) {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json('Unauthorized', { status: 400 });
        }

        if (!params.productId) {
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

        const product = await prismadb.product.deleteMany({
            where: {
                id: params.productId
            }
        });

        // console.log(product);
        return NextResponse.json(product);

    } catch (error) {
        console.log(`PRODUCT_DELETE: ${error}`);
        return NextResponse.json(error, { status: 400 });
    }
}
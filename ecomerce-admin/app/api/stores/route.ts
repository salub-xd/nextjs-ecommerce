import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {

        const stores = await prismadb.store.findMany();
        // console.log(stores);
        return NextResponse.json(stores);

    } catch (error) {
        console.log(`STORES_GET: ${error}`);
        return NextResponse.json(error, { status: 400 });
    }
}

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const { name } = await req.json();

        if (!userId) {
            return NextResponse.json('Unauthorized', { status: 400 });
        }
        if (!name) {
            return NextResponse.json('Name is required', { status: 400 });
        }

        const store = await prismadb.store.create({
            data: {
                name,
                userId,
            }
        });

        // console.log(store);
        return NextResponse.json(store);

    } catch (error) {
        console.log(`STORES_GET: ${error}`);
        return NextResponse.json(error, { status: 400 });
    }
}
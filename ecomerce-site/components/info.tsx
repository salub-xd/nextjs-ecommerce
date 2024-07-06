import { Product } from '@/types'
import React from 'react'
import Currency from '@/components/ui/currency';
import Button from './ui/button';
import { cn } from '@/libs/utlis';
import { ShoppingBag } from 'lucide-react';

interface InfoProps {
    data: Product;
}

const Info: React.FC<InfoProps> = ({
    data
}) => {



    return (
        <div>
            <h1 className=' text-3xl capitalize font-bold text-gray-900'>{data.name}</h1>
            <div className='mt-4 flex items-end justify-between'>
                <p className='text-2xl text-gray-700'>
                    <Currency value={data.price} />
                </p>
            </div>
            <hr className='my-4' />
            <div className='flex flex-col gap-y-6'>
                <div className='flex items-center gap-x-4'>
                    <h3 className=' font-semibold text-black'>Size:</h3>
                    <div>{data.size.value}</div>
                </div>
                <div className='flex items-center gap-x-4'>
                    <h3 className=' font-semibold text-black'>Color:</h3>
                    <div className='w-6 h-6 border-gray-600 rounded-full ' style={{ backgroundColor: data.color.value }} />
                </div>
            </div>
            <div className='mt-10 flex items-center gap-x-3 '>
                <Button className='flex items-center gap-x-2 rounded-md'>
                    Add To Cart
                    <ShoppingBag size={20} /></Button>
            </div>
        </div>
    )
}

export default Info;
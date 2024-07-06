'use client';

import { Product } from '@/types';
import { Expand, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import React, { EventHandler, MouseEventHandler } from 'react'
import IconButton from './icon-button';
import Currency from './currency';
import { useRouter } from 'next/navigation';
import usePreviewModal from '@/hooks/use-preview-modal';
import useCart from '@/hooks/use-cart';
interface ProductListProps {
    data: Product;
}
const ProductCard: React.FC<ProductListProps> = ({
    data
}) => {

    const cart = useCart();
    const router = useRouter();
    const handleClick = () => {
        router.push(`/product/${data.id}`);
    }

    const previewModal = usePreviewModal();

    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        // console.log(data);
        previewModal.onOpen(data);
    }

    const addToCard:MouseEventHandler<HTMLButtonElement> = (event)=>{
        event.stopPropagation();
        cart.addItem(data);
    }

    return (
        <div onClick={handleClick} className='group bg-white cursor-pointer rounded-xl border p-3 space-y-3'>
            <div className='aspect-square rounded-xl bg-gray-100 relative'>
                <Image
                    src={data?.images?.[0]?.url}
                    fill
                    alt='Image'
                    className='aspect-square object-cover rounded-md'
                />
                <div className='opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5'>
                    <div className='flex gap-x-6 justify-center'>
                        <div className='flex gap-x-6 justify-center'>
                            <IconButton
                                onClick={onPreview}
                                icon={<Expand size={20} className=' text-gray-600' />}
                            />
                            <IconButton
                                onClick={addToCard}
                                icon={<ShoppingCart size={20} className=' text-gray-600' />}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col'>
                <p className='text-lg font-semibold capitalize'>{data.name}</p>
                <p className='text-sm text-gray-700 capitalize'>{data.category?.name}</p>
            </div>
            <div className='flex items-center justify-between'>
                <Currency value={data.price} />
            </div>
        </div>
    )
}

export default ProductCard;

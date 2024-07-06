'use client';

import Container from '@/components/ui/container';
import useCart from '@/hooks/use-cart';
import React, { useEffect, useState } from 'react'
import CardItem from './components/card-item';
import Summary from './components/summary';

export const revalidate = 0;

const CardPage = () => {
    const [isMounted, setIsMounted] = useState(false);
    const cart = useCart();

    useEffect(() => {
        setIsMounted(true)
    }, []);

    if (!isMounted) {
        return null;
    }
    return (
        <div className='bg-white'>
            <Container>
                <div className='py-16 px-4 sm:px-6 lg:px-8'>
                    <div className='text-3xl text-black font-bold '>Shoping Card</div>
                    <div className='lg:grid lg:grid-cols-2 lg:gap-x-12'>
                        <div className='lg:col-span-6'>
                            {CardItem.length === 0 && <p className=' text-gray-500'>No Items added in cart</p>}
                            <ul>
                                {cart.items.map((item) => (
                                    <CardItem key={item.id} data={item} />
                                ))}
                            </ul>
                        </div>
                    </div>
                    <Summary />
                </div>
            </Container>
        </div>
    )
}

export default CardPage;

"use client";

import React, { useEffect, useState } from 'react'
import Button from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Sun } from 'lucide-react';
import useCart from '@/hooks/use-cart';

const NavActions = () => {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true)
  }, []);

  const router = useRouter();
  const cart = useCart();

  if (!isMounted) {
    return null;
  }

  return (
    <div className='flex items-center ml-auto gap-x-4'>
      <Button
        onClick={() => router.push('/cart')}
        className='flex items-center rounded-full px-4 py-2 '
      >
        <ShoppingCart size={20} color='white' />
        <span className='ml-2 font-medium text-white text-sm'>{cart.items.length}</span>
      </Button>
      <Button
        className='flex items-center rounded-full px-4 py-2 '
      >
        <Sun size={20} color='white' />
        
      </Button>
    </div>
  )
}

export default NavActions;

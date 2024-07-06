import React from 'react'
import { SizeForm } from './components/size-form';
import prismadb from '@/lib/prismadb';

const SizePage = async ({
  params }: {
    params: { sizeId: string }
  }) => {

  let size;

  if (params.sizeId !== 'new') {
    size = await prismadb.size.findUnique({
      where: {
        id: params.sizeId
      }
    });
  }

  return (
    <div className='flex flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SizeForm initialData={size} />
      </div>
    </div>
  )
}

export default SizePage;

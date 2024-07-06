import React from 'react'
import { ProductForm } from './components/product-form';
import prismadb from '@/lib/prismadb';

const ProductPage = async ({
  params }: {
    params: { storeId: string, productId: string }
  }) => {

  let product;

  if (params.productId !== 'new') {
    product = await prismadb.product.findUnique({
      where: {
        id: params.productId
      },
      include:{
        images:true
      }
    });
  }

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId
    }
  });
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId
    }
  });
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId
    }
  });


  return (
    <div className='flex flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ProductForm
          initialData={product}
          colors={colors}
          sizes={sizes}
          categories={categories}
        />
      </div>
    </div>
  )
}

export default ProductPage;

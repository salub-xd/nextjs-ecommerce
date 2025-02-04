import getBillboard from '@/actions/get-billboard'
import getProducts from '@/actions/get-products';
import Billboard from '@/components/billboard'
import ProductList from '@/components/product-list';
import Container from '@/components/ui/container';
import React from 'react'

export const revalidate = 0;

const HomePage = async () => {

  const billboard = await getBillboard('6582fba9a545c4681a325444');
  const products = await getProducts({ isFeatured: true });
  // console.log(products);

  return (
    <Container>
      <div className='space-y-10 pb-10'>
        <Billboard data={billboard} />
      </div>
      <div className='flex flex-col pb-10 gap-y-8 px-4 sm:px-6 lg:px-8'>
        <ProductList title={'Featured Products'} items={products} />
      </div>
    </Container>
  )
}

export default HomePage;
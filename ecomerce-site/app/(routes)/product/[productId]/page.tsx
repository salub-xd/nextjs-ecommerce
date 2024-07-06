import getProduct from '@/actions/get-product';
import getProducts from '@/actions/get-products';
import Gallery from '@/components/gallery';
import Info from '@/components/info';
import ProductList from '@/components/product-list';
import Container from '@/components/ui/container';
import React from 'react'

interface ProductPageProps {
    params: {
        productId: string
    }
}

const ProductPage: React.FC<ProductPageProps> = async ({
    params
}) => {

    const product = await getProduct(params.productId);
    const suggestedProducts = await getProducts({ categoryId: product?.category?.id })

    return (
        <div className=' bg-white'>
            <Container>
                <div className='py-10 px-4 sm:px-6 lg:px-8'>
                    <div className='lg:grid lg:grid-cols-2 lg:item-start lg:gap-x-8'>
                        <Gallery images={product.images} />
                        <div className='mt-10 px-4 sm:mt-16 lg:px-0 lg:mt-0'>
                            <Info data={product} />
                        </div>
                    </div>
                    <hr className='my-4' />
                    <ProductList title='Related Items' items={suggestedProducts} />
                </div>
            </Container>
        </div>
    )
}

export default ProductPage;

import getBillboard from '@/actions/get-billboard';
import getCategory from '@/actions/get-category';
import getColors from '@/actions/get-colors';
import getProducts from '@/actions/get-products';
import getSizes from '@/actions/get-sizes';
import Billboard from '@/components/billboard';
import Gallery from '@/components/gallery';
import Info from '@/components/info';
import ProductList from '@/components/product-list';
import Container from '@/components/ui/container';
import ProductCard from '@/components/ui/product-card';
import React from 'react'
import MobileFilters from './components/mobile-filters';
import Filter from './components/filter';
import NoResults from '@/components/ui/no-results';

export const revalidate = 0;

interface CategoryPageProps {
    params: {
        categoryId: string;
    },
    searchParams: {
        colorId: string;
        sizeId: string;
    }

}

const CategoryPage: React.FC<CategoryPageProps> = async ({
    params,
    searchParams
}) => {

    const products = await getProducts({
        categoryId: params.categoryId,
        colorId: searchParams.colorId,
        sizeId: searchParams.sizeId
    });
    const category = await getCategory(params.categoryId);
    const sizes = await getSizes();
    const colors = await getColors();

    return (
        <div className='bg-white'>
            <Container>
                <Billboard data={category.billboard} />
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                        <MobileFilters sizes={sizes} colors={colors} />
                        <div className="hidden lg:block">
                            <Filter
                                valueKey="sizeId"
                                name="Sizes"
                                data={sizes}
                            />
                            <Filter
                                valueKey="colorId"
                                name="Colors"
                                data={colors}
                            />
                        </div>
                        <div className='mt-6 lg:col-span-4 px-6 md:px-0'>
                            {products.length === 0 && <NoResults />}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {products.map((product) => (
                                    <ProductCard key={product.id} data={product} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default CategoryPage;

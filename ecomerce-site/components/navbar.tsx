import MainNav from '@/components/main-nav';
import Container from './ui/container';
import Link from 'next/link';
import getCategories from '@/actions/get-categories';
import NavActions from './nav-actions';

// export const revalidate = 0;

const Navbar = async () => {
    const categories = await getCategories();
    return (
        <div className='bg-white  border'>
            <Container>
                <div className='flex px-4 sm:px-6 lg:px-8 h-16 items-center '>
                    <Link href={'/'} className='ml-4 flex items-center lg:ml-0 gap-x-2'>
                        <p className=' font-bold text-xl'>Store</p>
                    </Link>
                    <MainNav data={categories} />
                    <NavActions />
                </div>
            </Container>
        </div>
    )
}

export default Navbar;
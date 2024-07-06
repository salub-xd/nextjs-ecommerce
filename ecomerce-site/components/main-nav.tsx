"use client";

import { cn } from '@/libs/utlis';
import { Category } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({
  data
}) => {

  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`
  }));

  return (
    <div className='flex mx-4 lg:mx-6 space-x-4 '>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn('text-sm capitalize font-medium hover:text-black',
            route.active ? 'text-black' : 'text-gray-500')}
        >
          {route.label}
        </Link>
      ))}
    </div>
  )
}

export default MainNav;

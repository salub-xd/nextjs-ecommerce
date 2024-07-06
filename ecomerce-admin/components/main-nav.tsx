'use client';

import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Menu, X } from 'lucide-react';
import { Button } from "./ui/button";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const MainNav = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {

    const [open, setOpen] = useState(false);
    const pathName = usePathname();
    const params = useParams();
    const router = useRouter();
    const [dropdownMenu, setDropdownMenu] = useState(false);

    const changeStore = (route: { label: string, href: string }) => {
        setOpen(false);
        router.push(`${route.href}`)
    }

    const routes = [
        {
            href: `/${params.storeId}/`,
            label: `Store`,
            active: pathName === `/${params.storeId}`,
        },
        {
            href: `/${params.storeId}/billboards`,
            label: `Billboards`,
            active: pathName === `/${params.storeId}/billboards`,
        },
        {
            href: `/${params.storeId}/categories`,
            label: `Categories`,
            active: pathName === `/${params.storeId}/categories`,
        },
        {
            href: `/${params.storeId}/colors`,
            label: `Colors`,
            active: pathName === `/${params.storeId}/colors`,
        },
        {
            href: `/${params.storeId}/sizes`,
            label: `Sizes`,
            active: pathName === `/${params.storeId}/sizes`,
        },
        {
            href: `/${params.storeId}/products`,
            label: `Products`,
            active: pathName === `/${params.storeId}/products`,
        },
        {
            href: `/${params.storeId}/orders`,
            label: `Orders`,
            active: pathName === `/${params.storeId}/orders`,
        },
        {
            href: `/${params.storeId}/settings`,
            label: `Settings`,
            active: pathName === `/${params.storeId}/settings`,
        },
    ]
    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <div className={cn(`hidden lg:flex items-center space-x-4 lg:scroll-x-6`, className)}>
                    {routes.map((route) => (
                        <Link key={route.href} href={route.href} className={cn(`text-sm font-medium transition-colors hover:text-primary`, route.active ? 'text-black dark:text-white' : 'text-muted-foreground')}>{route.label}</Link>
                    ))}
                </div>
                <div className="lg:hidden flex w-3/4 justify-center mx-4">
                    <PopoverTrigger asChild>
                        <Button
                            size={'sm'}
                            variant="outline"
                            role="combobox"
                            aria-label="Select a store"
                            aria-expanded={open}
                            className={cn(`w-auto justify-between`, className)}
                            onClick={() => setDropdownMenu(!dropdownMenu)}
                        >
                            {!dropdownMenu ?
                                <Menu size={20} />
                                : <X size={20} />
                            }
                        </Button>
                    </PopoverTrigger>
                </div>
                <PopoverContent className="lg:hidden w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search framework..." />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {routes.map((route) => (
                                <CommandItem key={route.href} onSelect={() => changeStore(route)} className="px-4 text-sm cursor-pointer">
                                    {route.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </>
    )
}

export default MainNav;

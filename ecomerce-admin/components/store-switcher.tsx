'use client';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { useStoreModal } from "@/hooks/use-store-modal";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[];
}


const StoreSwitcher: React.FC<StoreSwitcherProps> = ({
    className,
    items = []
}) => {
    const [open, setOpen] = useState(false);
    const params = useParams();
    const router = useRouter();

    const storeModal = useStoreModal();

    const formattedItems = items.map((item) => ({
        label: item.name,
        value: item.id
    }));

    const currentStore = formattedItems.find((item) => item.value === params.storeId);

    const changeStore = (store: { label: string, value: string }) => {
        setOpen(false);
        router.push(`/${store.value}`)
    }

    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        size={'sm'}
                        variant="outline"
                        role="combobox"
                        aria-label="Select a store"
                        aria-expanded={open}
                        className={cn(`w-auto justify-between`, className)}
                    >
                        <StoreIcon className="mr-2 w-5 h-5" />
                        {currentStore?.label}
                        <ChevronsUpDown className="ml-2 w-4 h-4 opacity-60" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search framework..." />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {formattedItems.map((store) => (
                                <CommandItem key={store.value} onSelect={() => changeStore(store)} className="text-sm cursor-pointer">
                                    <StoreIcon className="mr-2 w-5 h-5" />
                                    {store.label}
                                    <Check className={cn(`ml-auto w-4 h-4`, currentStore?.value === store.value ? `opacity-100` : `opacity-0`)} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                    <Separator />
                    <Command>
                        <CommandGroup>
                            <CommandItem onSelect={() => {
                                setOpen(false);
                                storeModal.onOpen();
                            }}>
                                <PlusCircle className="mr-4 h-5 w-5" />
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </>
    )
}

export default StoreSwitcher;

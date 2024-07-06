import { Product } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartStoreProps {
    items: Product[];
    addItem: (data: Product) => void;
    removeItem: (id: string) => void;
    removeAll: () => void;
}

const useCart = create(
    persist<CartStoreProps>((set, get) => ({
        items: [],
        addItem: (data: Product) => {
            const currentItems = get().items;
            const existingItems = currentItems.find((item) => item.id === data.id);

            if (existingItems) {
                return toast('Items already in cart');
            }

            set({ items: [...get().items, data] });
            return toast('Items added in cart');
        },
        removeItem: (id: string) => {
            set({ items: [...get().items.filter((item) => item.id !== id)] });
            return toast('Item removed from cart');
        },
        removeAll: () => set({ items: [] })

    }), {
        name: 'cart-storage',
        storage: createJSONStorage(() => localStorage)
    }));

export default useCart;
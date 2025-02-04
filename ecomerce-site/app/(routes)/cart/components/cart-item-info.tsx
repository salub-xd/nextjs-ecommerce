interface CartItemInfoProps {
    product: Record<string, any>;
}

const CartItemInfo: React.FC<CartItemInfoProps> = ({
    product
}) => {
    return (
        <>
            <div className="flex justify-between border">
                <p className=" text-sm font-semibold text-black">
                    {product.name}
                </p>
            </div>
            <div className="mt-1 flex text-sm">
                <p className="text-gray-500">{product.color}</p>
                <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{product.size}</p>
            </div>
            <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>
        </>
    );
}

export default CartItemInfo;
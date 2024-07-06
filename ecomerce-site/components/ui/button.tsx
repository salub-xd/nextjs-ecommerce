import { cn } from "@/libs/utlis";
import { forwardRef } from "react";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    children,
    disabled,
    type = "button",
    ...props
}, ref) => {
    return (
        <button
            disabled={disabled}
            ref={ref}
            {...props}
            className={cn(' w-auto rounded-full px-5 py-3 text-white bg-black disabled:cursor-not-allowed disabled:opacity-50 font-semibold hover:opacity-70 transition', className)}
        >
            {children}
        </button>

    )
});

Button.displayName = 'Button';

export default Button;
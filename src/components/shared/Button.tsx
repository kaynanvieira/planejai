import type { LucideIcon } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    variant: 'primary' | 'secondary' | 'ghost' | 'icon'
    icon?: LucideIcon
}

export function Button({variant, icon}: ButtonProps){
    return <button>Clique aqui</button>
}

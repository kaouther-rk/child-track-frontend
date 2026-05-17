"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function UpBarItem({ children, href, className, icon, mode = "link", onClick }: { children?: React.ReactNode, href?: string | undefined, className?: string, icon?: React.ReactNode, mode?: "button" | "link" | "icon", onClick?: () => void }) {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <li className="block">
            {mode === "button" ? (
                <button
                    className={cn("flex items-center gap-2 py-2 lg:py-0 px-4 text-title-medium cursor-pointer lg:text-on-secondary lg:dark:text-dark-on-secondary  hover:opacity-80", className)}
                    onClick={onClick}
                >
                    {icon && <span className="mr-2">{icon}</span>}
                    {children}
                </button>
            ) : mode === "link" ? (
                <Link href={href ?? "#"}
                    className={cn("flex items-center gap-2 py-2 lg:py-0 px-4 text-title-medium cursor-pointer lg:text-on-secondary lg:dark:text-dark-on-secondary  hover:opacity-80", isActive && " font-bold ", className)}
                >
                    {icon && <span className="mr-2">{icon}</span>}
                    {children}
                </Link>
            ) : mode === "icon" ? (
                <div className="flex items-center gap-2 py-2 lg:py-0 px-4 text-title-medium cursor-pointer lg:text-on-secondary lg:dark:text-dark-on-secondary  hover:opacity-80">
                    {icon}
                </div>
            ) : null}
        </li>
    )
}
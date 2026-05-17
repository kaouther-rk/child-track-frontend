import Image from "next/image"
import React from "react"

export function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="flex px-4 h-[calc(100vh-4rem)] items-center lg:gap-6 "
        >
            {children}
        </div>
    )
}

export function AuthPictureLayout({ src }: { src: string }) {
    return (
        <div className="hidden lg:flex lg:justify-center lg:grow ">
            <Image alt="Login Picture" src={src} width={500} height={500} />
        </div>
    )
}


export function AuthCard({ children }: { children: React.ReactNode }) {
    return (
        <div className="grow p-6 flex flex-col items-center gap-8 ">
            {children}
        </div>
    )
}
export function AuthTitle({ title }: { title: string }) {
    return (
        <h1 className="text-headline-large  text-primary dark:text-dark-primary">
            {title}
        </h1>
    )
}
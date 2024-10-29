'use client'
import Link from "next/link"
import React from "react"
import { usePathname  } from "next/navigation";


const Menu = () => {
    const pathname = usePathname();

    const getDivClass = (urlPath: string) =>
        pathname === urlPath || pathname.startsWith(urlPath + '/') ? 'bg-baseAccent' : 'bg-baseLight shadow-inset-top';

    return (
        <>
        <nav className="w-full flex justify-evenly">
            <Link className={`${getDivClass('/')} flex flex-grow items-center justify-center p-2 `} href="/">Home</Link>
            <Link className={`${getDivClass('/profile')} flex flex-grow items-center justify-center p-2 `} href="/profile">Profile</Link>
            <Link className={`${getDivClass('/category')} flex flex-grow items-center justify-center p-2 `} href="/category">category</Link>
        </nav>
        </>
    )
}

export default Menu
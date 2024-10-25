import Link from "next/link"

const Menu = () => {
    return (
        <nav className=" w-full flex justify-evenly">
            <Link className="bg-baseLight flex flex-grow items-center justify-center p-2" href="/">Home</Link>
            <Link className="bg-baseLight flex flex-grow items-center justify-center p-2" href="/profile">Profile</Link>
            <Link className="bg-baseLight flex flex-grow items-center justify-center p-2" href="/category">category</Link>
        </nav>
    )
}

export default Menu
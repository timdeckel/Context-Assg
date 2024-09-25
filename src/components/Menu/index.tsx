import Link from "next/link"

const Menu = () => {
    return (
        <nav>
            <Link href="/">Home</Link>
            <Link href="/profile">Profile</Link>
            <Link href="/category">category</Link>
        </nav>
    )
}

export default Menu
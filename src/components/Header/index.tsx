'use client'
import { useUserContext } from "@/utils/contexts";
import { UserContextType, UserType } from "@/utils/types"

const Header = () => {
    const { user, setUser} = useUserContext() as UserContextType;

    return (
        <header className="flex w-full p-3 justify-center items-center bg-baseAccent relative overflow-hidden">
            {user ? <button className="absolute left-5 bg-baseLight p-1 rounded" onClick={()=> setUser(null)}>Log Out</button> : "" } 
            <h1>Meal Pal</h1>
        </header>
    )
}

export default Header;
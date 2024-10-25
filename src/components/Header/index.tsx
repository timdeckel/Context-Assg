'use client'
import { useUserContext } from "@/utils/contexts";
import { UserContextType, UserType } from "@/utils/types"

const Header = () => {
    const { user, setUser} = useUserContext() as UserContextType;


    return (
        <header className="flex w-full p-3 justify-center bg-baseAccent">
            <h1>Recipe finder</h1>
            {user ? <button onClick={()=> setUser(null)}>Log Out</button> : "" } 
        </header>
    )
}

export default Header;
'use client'

import { useUserContext } from "@/utils/contexts"
import { UserContextType, UserType } from "@/utils/types"

const Header = () => {
    const {user, setUser} = useUserContext() as UserContextType


    const logout = () => {
        setUser(null);
    }

    return (
            <header className="">
                <h1 className="bg-blue-300" >Recipe finder</h1>
                {!user ? "" : (<button onClick={logout}>Log out</button>)}
                
           </header>
    )
}

export default Header;
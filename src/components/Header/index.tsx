'use client'

import { useUserContext } from "@/utils/contexts"
import { UserContextType, UserType } from "@/utils/types"

const Header = () => {
    const {user, setUser} = useUserContext() as UserContextType


    const logout = () => {
        setUser(null);
    }

    return (
            <header>
                <h1>Recipe finder</h1>
                <button onClick={logout}>Log out</button>
           </header>
    )
}

export default Header;
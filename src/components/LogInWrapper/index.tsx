'use client'

import { useUserContext } from "@/utils/contexts"
import { UserContextType } from "@/utils/types"
import LogIn from "../Login"
import Menu from "../Menu"

const LogInWrapper = ({children}:{children:React.ReactNode}) => {
    const {user} = useUserContext() as UserContextType;
    return (
        <div>
            {!user ? <LogIn/> : (
                <>
                <Menu/>
                <p>Hi {user.name}</p>
                {children}
                </>
            )}
        </div>
    )
}

export default LogInWrapper
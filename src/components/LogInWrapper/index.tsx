'use client'

import { useUserContext } from "@/utils/contexts"
import { UserContextType } from "@/utils/types"
import LogIn from "../Login"
import Menu from "../Menu"

const LogInWrapper = ({children}:{children:React.ReactNode}) => {
    const {user} = useUserContext() as UserContextType;
    return (
        <div className="flex flex-col w-full h-full items-center justify-center">
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
'use client'

import { useUserContext } from "@/utils/contexts"
import { UserContextType, UserType } from "@/utils/types"
import { useRouter } from "next/router"


import LogIn from "../Login"
import Menu from "../Menu"

const LogInWrapper = ({children}:{children:React.ReactNode}) => {
    const {user} = useUserContext() as UserContextType
    

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
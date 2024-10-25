'use client'
import { SetStateAction, useState } from "react"
import { registeredUsers } from "@/utils/users"
import { UserContextType, UserType } from "@/utils/types"
import { useUserContext } from "@/utils/contexts"

const LogIn = () => {
    const [userInput, setUserInput] = useState<string | null>(null)
    const { user, setUser, saveRecipe, removeRecipe} = useUserContext() as UserContextType;
    //const {user, setUser} = useUserContext() as UserContextType

    const handleChange = (e: { target: { value: SetStateAction<string | null> } }) => {
        setUserInput(e.target.value)
    }

    const handleClick = () => {
            const loggedInUser:UserType[] = registeredUsers.filter((user:UserType) => user.name === userInput)
        if (loggedInUser) {
            console.log(localStorage.getItem(loggedInUser[0].name))
            const userFrom = localStorage.getItem(loggedInUser[0].name)
            if(userFrom) {
                setUser(JSON.parse(userFrom))
            }else {
                setUser(loggedInUser[0])
            }
        }
    }
    
    return (
        <div className="flex flex-col bg-baseAccent w-full h-full gap-4 p-6 items-center">
            <p className="text-3xl">Login</p>
            <div className="flex flex-col justify-center gap-4 items-center">
                <label htmlFor="user-input" >Enter Username</label>
                <input id="user-input" placeholder="Username" onChange={handleChange}></input>
                <button className="bg-gradient-to-b from-[#599bb3] to-[#408c99] text-white font-bold text-xl py-3 px-8 rounded-lg shadow-lg hover:from-[#408c99] hover:to-[#599bb3] active:relative active:top-[1px]" onClick={handleClick}>Log in</button>
            </div>
        </div>
    )
}

export default LogIn
'use client'
import { SetStateAction, useState } from "react"
import { registeredUsers } from "@/utils/users"
import { UserContextType, UserType } from "@/utils/types"
import { useUserContext } from "@/utils/contexts"

const LogIn = () => {
    const [userInput, setUserInput] = useState<string | null>(null)

    const {setUser} = useUserContext() as UserContextType

    const handleChange = (e: { target: { value: SetStateAction<string | null> } }) => {
        setUserInput(e.target.value)
    }

    const handleClick = () => {
        const loggedInUser:UserType[] = registeredUsers.filter((user:UserType) => user.name === userInput)
        if (loggedInUser) {
            console.log(loggedInUser[0])
            setUser(loggedInUser[0])
        }
    }
    return (
        <div>
            <p>To log in please use your user name</p>
            <label htmlFor="user-input">Enter user name</label>
            <input id="user-input" onChange={handleChange}></input>
            <button onClick={handleClick}>Log in</button>
        </div>
    )
}

export default LogIn
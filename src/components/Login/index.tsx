'use client'
import { SetStateAction, useState, useEffect } from "react"
import { registeredUsers } from "@/utils/users"
import { UserContextType, UserType } from "@/utils/types"
import { useUserContext } from "@/utils/contexts"


const LogIn = () => {
    const [userInput, setUserInput] = useState<string | null>(null)
    const {user, setUser} = useUserContext() as UserContextType
    

    const handleChange = (e: { target: { value: SetStateAction<string | null> } }) => {
        setUserInput(e.target.value)
    }

    const handleClick = async () => {
        const loggedInUser:UserType[] = registeredUsers.filter((user:UserType) => user.name === userInput)
        if (loggedInUser) {
            const storedUserData = localStorage.getItem(loggedInUser[0].name);
            console.log("inne i loggedinUser user !== null, värdet i loggedinUser"+ loggedInUser)
        if (storedUserData !== null) {
            console.log("inne i storedUserData ifen, ")
            const storedData = JSON.parse(storedUserData); 

            const updatedUser: UserType = {
                ...user,
                ...storedData 
            };

            setUser(updatedUser);
            }else {
                localStorage.setItem(loggedInUser[0].name, JSON.stringify(loggedInUser[0]));
                console.log("loggar loggedInUser[0] i login, " + loggedInUser[0]);
                setUser(loggedInUser[0]);
            }
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

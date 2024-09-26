'use client'
import LogIn from "@/components/Login"
import { useUserContext } from "@/utils/contexts"
import { UserContextType } from "@/utils/types"
import { useEffect, useState } from "react"
import { UserType } from "@/utils/types"
import { createConnection } from "net"
import { error } from "console"





const category = ({children}:{children:React.ReactNode}) => {
    const {user} = useUserContext() as UserContextType;
     

//     const [serverUrl, setServerUrl] = useState<any>(null)
//     const [userCategory, setUserCategory] = useState<UserType>()

// useEffect(() => {
//     fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + user?.category)
//     .then((response) => response.json())
//     .then((data) => {
//         setServerUrl(data);
//         console.log(data)
//      })
    
// },[user, category]);

    const [data, setData] = useState([])
    const [userCategory, setUserCategory] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + user?.category)
            const jsonData = await response.json();
            setData(jsonData);
            console.log(jsonData.meals[0])
        }
        fetchData();
    }, []);

    return (
        <div>
            {/* <p>{user?.category}</p>
            <p>{data.category}</p> */}
           
             {!user ? <LogIn/> : (
                <>
                <p>favorite {user.category}</p>
                
                <h1>Category page</h1>
                {children}
                </>
            )} 
            
        </div>
        
    )
}
export default category


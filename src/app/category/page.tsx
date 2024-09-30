'use client'

import { useUserContext } from "@/utils/contexts"
import { UserContextType } from "@/utils/types"
import { useEffect, useState } from "react"
import { CategoryType } from "@/utils/types"
import Link from "next/link"


const category = ({children}:{children:React.ReactNode}) => {
    const {user} = useUserContext() as UserContextType;
     
    const [categories, setCategories] = useState<CategoryType[]>([]);
  
    useEffect( () => {
      const fetchRecipes = async () => {
        try {
          if (user) {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
            const data = await response.json();
            console.log(data)
            setCategories(data.categories)
          }
        }catch (error){
          console.log(error)
        }
        
      }

      fetchRecipes();

    }, [])

    return (
        <div>
            <h1>Category page</h1>
            {categories.length > 0 ? (
                categories.map((category: CategoryType) => (
                <div key={category.idCategory}> 
                    <Link href={`/category/${category.strCategory}`}>{category.strCategory}
                    </Link>
                </div>
                ))
            ) : (
                <p>Loading categories...</p> 
            )}
            {children}
        </div>
    )
}
export default category


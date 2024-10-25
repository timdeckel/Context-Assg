'use client'

import { useUserContext } from "@/utils/contexts"
import { UserContextType } from "@/utils/types"
import { useEffect, useState } from "react"
import { UserType } from "@/utils/types"
import { createConnection } from "net"
import { RecipeType } from "@/utils/types"
import { CategoryType } from "@/utils/types"
import Link from "next/link"

const category = ({children}:{children:React.ReactNode}) => {
    
  const { user } = useUserContext() as UserContextType;
  const [categories, setCategories] = useState<CategoryType[]>([]);
    
  useEffect( () => {
    const fetchRecipes = async () => {
      try {
        if (user) {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
          const data = await response.json();
          console.log(data)
          setCategories(data.categories)
          console.log("datan i categories" + categories)
          console.log(data.categories)          }
        }catch (error){
          console.log(error)
        }
      }
      fetchRecipes();
    }, [])


    return (
        <div>
          <>
          <p>favorite {user?.category}</p>
          <h1>Category page</h1>
          {categories.length > 0 ? (
            categories.map((category: CategoryType) => (
              <div key={category.idCategory}> {/* Add a unique key */}
              <Link href={`/category/${category.strCategory}`}>{category.strCategory}</Link>
              </div>
            ))
          ) : (
            <p>Loading categories...</p> // Display loading message if categories are not yet loaded
          )}
          {children}
          </>
        </div>
  )
}
export default category


'use client'

import { useUserContext } from "@/utils/contexts"
import { UserContextType } from "@/utils/types"
import { useEffect, useState } from "react"
import { CategoryType } from "@/utils/types"
import Link from "next/link"

const category = ({children}:{children:React.ReactNode}) => {
    
  const { user, changeFavoriteCategory } = useUserContext() as UserContextType;
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
          console.log(data.categories)          
          }
        }catch (error){
          console.log(error)
        }
      }
      fetchRecipes();
    }, [])


    return (
        <div className="p-4">
          <div className="flex justify-center w-full">
            <h1 className="text-xl">Category page</h1>
          </div>
          <p>favorite {user?.category}</p>
          <div className="grid grid-cols-2 gap-4">
            {categories.length > 0 ? (
            categories.map((category: CategoryType) => (
              <div className="bg-baseLight p-2" key={category.idCategory}> 
                <Link href={`/category/${category.strCategory}`}>
                  {category.strCategory}
                  <img src={category.strCategoryThumb} alt="" />
                </Link>
                {user?.category === category.strCategory ? 
                <div></div>: 
                <button onClick={() => changeFavoriteCategory(category.strCategory)} className="px-2 mt-2 bg-baseAccent rounded">Favorite</button> }
              </div>
            ))
          ) : (
            <p>Loading categories...</p> 
          )}
          </div>
          {children}
        </div>
  )
}
export default category


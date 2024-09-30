'use client'

import { RecipeType } from "@/utils/types"
import { useEffect, useState } from "react"
import Link from "next/link";


const categoryPage = ({params}: {params: {id:string}}  ) => {
    const {id} = params
    const [recipes, setRecipes] = useState<RecipeType | null >(null)

    useEffect( () => {
        const fetchRecipes = async () => {
          try {
            if (id) {
              const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`)
              console.log(id)
              const data = await response.json();
              console.log(data)
              setRecipes(data.meals)
            }
          }catch (error){
            console.log(error)
          }
        }
        fetchRecipes();
      }, [])
    return (
        <div>
            <p>Hello from the recipe page id is {id}</p>
            {recipes && recipes.map((meal: RecipeType) => (
            <div key={meal.idMeal}>
              <Link href={`/recipe/${meal.idMeal}`}>{meal.strMeal}
              </Link>
              <img src={meal.strMealThumb} height="auto" width="200px" />
            </div>
          ))}
        </div>
    )
}

export default categoryPage
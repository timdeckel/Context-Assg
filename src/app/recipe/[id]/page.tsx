'use client'

import { RecipeType } from "@/utils/types"
import { useEffect, useState } from "react"

const recipePage = ({params}: {params: {id:string}}  ) => {
    const {id} = params
    const [recipe, setRecipe] = useState<RecipeType | null>(null)

    useEffect( () => {
        const fetchRecipes = async () => {
          try {
            if (id) {
              const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
              const data = await response.json();
            console.log(data)
            setRecipe(data.meals[0])
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
            {recipe && (<div>
               <p>{recipe.strMeal}</p> 
               <img height="auto" width="200" src={recipe.strMealThumb}></img>
                </div>)}
        </div>
    )
}

export default recipePage
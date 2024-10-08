'use client'

import { RecipeType } from "@/utils/types"
import { useEffect, useState } from "react"
import { useUserContext } from "@/utils/contexts";
import { UserContextType } from "@/utils/types";

const recipePage = ({params}: {params: {id:string}}  ) => {
  const { user, saveRecipe, removeRecipe} = useUserContext() as UserContextType;
  const {id} = params
  const [recipe, setRecipe] = useState<RecipeType | null>(null)

  useEffect( () => {
      const fetchRecipes = async () => {
        try {
          if (id) {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            const data = await response.json();
          //console.log(data)
          setRecipe(data.meals[0])
          }
        }catch (error){
          console.log(error)
        }
      }
      fetchRecipes();
    }, [])
  
    const handleSaveRecipe = async () => {
      if (user && recipe && !user.savedRecipes.includes(recipe.idMeal)) {
        await saveRecipe(recipe.idMeal);
        console.log("Recipe saved in context");
      }
    }

    const handleRemoveRecipe = async () => {
      if (user && recipe && user.savedRecipes.includes(recipe.idMeal)) {
        await removeRecipe(recipe.idMeal);
        console.log("Recipe removed from context");
      }
    }

    useEffect(() => {
      if (user) {
        localStorage.setItem(user.name, JSON.stringify(user));
        console.log("LocalStorage updated with new user data:", user);
      }
    }, [user?.savedRecipes]); 

  return (
      <div>
          <p>Hello from the recipe page id is {id}</p>
          {recipe && (<div>
              <p>{recipe.strMeal}</p> 
              <img height="auto" width="200" src={recipe.strMealThumb}></img>
              {user?.savedRecipes.includes(recipe.idMeal) ?
                <button onClick={handleRemoveRecipe}> Unfavorite recipe. </button>
              : (<button onClick={handleSaveRecipe}> Favorite recipe. </button>

              )}
              
              <p>{recipe.strInstructions}</p>
              </div>)}
      </div>
  )
}

export default recipePage

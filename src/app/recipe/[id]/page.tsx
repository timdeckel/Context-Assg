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
      
      const handleSaveRecipe = () => {
        if(user){
          if( recipe && !user.savedRecipes.includes(recipe.idMeal)){
            saveRecipe(recipe.idMeal); 
            let username = user.name
            localStorage.setItem(username ,JSON.stringify(user))
          } else {
            console.log(recipe?.idMeal +" finns redan, här är hela listan på users recept: " + user.savedRecipes )
          }
        }
      };

      useEffect(() => { // denna är här för att se updateringen i user.
        console.log("Updated saved recipes: ", user?.savedRecipes);
        console.log("värdet i user, name: " + user?.name + " category: " + user?.category)
      }, [user?.savedRecipes]);

      const handleRemoveRecipe = () => {
        if(user){
          if( recipe && user.savedRecipes.includes(recipe.idMeal)){
            removeRecipe(recipe.idMeal)
            let username = user.name
            localStorage.setItem(username ,JSON.stringify(user))
          } 
        }
      }

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
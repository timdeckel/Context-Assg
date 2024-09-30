'use client'

import { RecipeType } from "@/utils/types"
import { useEffect, useState } from "react"
import { useUserContext } from "@/utils/contexts";
import { UserContextType } from "@/utils/types";



const profile = ({params}: {params: {id:string}}) => {
    const { user, saveRecipe, removeRecipe} = useUserContext() as UserContextType;
    const {id} = params
    const [favorteRecipes, setFavorteRecipes] = useState<RecipeType[]>([]);

    

    useEffect( () => {
        const fetchRecipes = async () => {
            if (user?.savedRecipes.length) {
                try {
                    const fetchedRecipes = await Promise.all(
                        user.savedRecipes.map(async(recipeId) =>{
                            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
                            const data = await response.json();
                            return data.meals[0];
                        })
                    );
                    console.log("värdet i fetchedrecipes "+ fetchedRecipes)
                    setFavorteRecipes(fetchedRecipes)
                } catch (error) {
                    console.error("Error fetching saved recipes:", error);
                }
            }
        }
        fetchRecipes();
      }, [user])

    return (
    <>
        <h1>Profile page</h1>
        <p>Welcome {user?.name}</p>
        <p>This is your favorite category: {user?.category}</p>
        <p>These are your favorite recipes</p>
        {favorteRecipes && favorteRecipes.map((item, index) => <div key={index}>
               <p>{item.strMeal}</p> 
               <img height="auto" width="200" src={item.strMealThumb}></img>
               {/* {user?.savedRecipes.includes(item.idMeal) ?
                  <button onClick={handleRemoveRecipe}> Unfavorite recipe. </button>
               : (<button onClick={handleSaveRecipe}> Favorite recipe. </button>

               )} */}
               
               <p>{item.strInstructions}</p>
                </div>)}
    </>
    )
}
export default profile
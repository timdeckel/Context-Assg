'use client'

import { RecipeType } from "@/utils/types"
import { useEffect, useState } from "react"
import { useUserContext } from "@/utils/contexts";
import { UserContextType } from "@/utils/types";
import Link from "next/link";

const profile = ({params}: {params: {id:string}}) => {
    const { user, removeRecipe} = useUserContext() as UserContextType;
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

      useEffect(() => {
        if (user) {
          localStorage.setItem(user.name, JSON.stringify(user));
          console.log("LocalStorage updated with new user data:", user);
        }
      }, [user?.savedRecipes]); 

      const handleRemoveRecipe = async (recipeId: string) => {
          await removeRecipe(recipeId);
          console.log("Recipe removed from context");
      }
  
    return (
    <>
        <h1>Profile page</h1>
        <p>Welcome {user?.name}</p>
        <p>This is your favorite category: {user?.category}</p>
        <p>These are your favorite recipes</p>
        {favorteRecipes && favorteRecipes.map((item, index) => 
            <div key={index}>
                <Link href={`/recipe/${item.idMeal}`}>{item.strMeal}
                </Link>
                <img height="auto" width="200" src={item.strMealThumb}></img>
                <button onClick={() => handleRemoveRecipe(item.idMeal)}> Unfavorite recipe. </button>
                <p>{item.strInstructions?.slice(0,200)}</p>
            </div>
        )}
    </>
    )
}
export default profile
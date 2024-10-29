'use client'

import { RecipeType } from "@/utils/types"
import { useEffect, useState } from "react"
import { useUserContext } from "@/utils/contexts"
import { UserContextType } from "@/utils/types"
import Link from "next/link"

const profile = ({params}: {params: {id:string}}) => {
    const {id} = params
    const [recipe, setRecipe] = useState<RecipeType | null>(null)
    const { user, saveRecipe, removeRecipe} = useUserContext() as UserContextType;
    const [favoriteRecipes, setFavoriteRecipes] = useState<RecipeType[]>([])

    useEffect(() => {
        const fetchRecipes = async () => {
            if(user?.savedRecipes.length) {
                try{
                    const fetchedRecipes = await Promise.all(
                        user.savedRecipes.map(async(recipeId) => {
                            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
                            const data = await response.json();
                            return data.meals[0]
                        })
                    );
                    setFavoriteRecipes(fetchedRecipes)
                }catch (error) {
                    console.error("Error", error);
                }
            }
        }
        fetchRecipes();
    }, [user])

    const handleRemoveRecipe = () => {
        if(user){
          if(recipe && user.savedRecipes.includes(recipe.idMeal)) {
            removeRecipe(recipe.idMeal);
          }else {
            console.log(recipe?.idMeal +" finns redan, här är hela listan på users recept: " + user.savedRecipes )
          }
        }
      }

    return (
        <> 
        <div className="p-4">
            <h1 className="text-xl">{user?.name}'s Profile</h1>
            <p>Your favorite category: {user?.category}</p>
            <p>These are your favorite recipes </p>
            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 justify-center items-center bg-baseAccent rounded gap-4 p-2 md:p-8">
                {favoriteRecipes && favoriteRecipes.map((item, index) => <div key={index}>
                    <div className="flex flex-col justify-center items-center rounded bg-baseLight p-2 pb-6 w-full" key={item.idMeal}>
                        <Link className="flex flex-col justify-center items-center" href={`/recipe/${item.idMeal}`}>{item.strMeal}
                        <img className="w-5/6" src={item.strMealThumb} height="200px" width="auto" />
                        </Link>
                        <button onClick={handleRemoveRecipe}>Unfavorite</button>
                    </div>
                </div>)}
            </div>
            
        </div>
        </>
        
    )
}
export default profile;
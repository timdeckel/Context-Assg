'use client'

import { RecipeType } from "@/utils/types"
import { useEffect, useState } from "react"
import { useUserContext } from "@/utils/contexts";
import { UserContextType } from "@/utils/types";

const recipePage = ({params}: {params: {id:string}}  ) => {
    const { user, saveRecipe, removeRecipe} = useUserContext() as UserContextType;
    const {id} = params
    const [recipe, setRecipe] = useState<RecipeType | null>(null)
    const [ingredients, setIngredients] = useState<string[]>([]);
  

    useEffect( () => {
        const fetchRecipes = async () => {
          try {
            if (id) {
              const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
              const data = await response.json();
              //console.log(data.meals[0].strInstructions)
              getIngredients(data.meals[0])
              setRecipe(data.meals[0])
            }
          }catch (error){
            console.log(error)
          }
        }
        fetchRecipes();
      }, [])

      const getIngredients = (data: any) => {
        console.log("getIng data: " + data)
        let ingredients: string[] = [];
        for (let index = 1; index < 20; index++) {
          let ingredientKey = `strIngredient${index}`; 
          let measurmentKey = `strMeasure${index}`;
          const ingredient = data[ingredientKey];
          const measure = data[measurmentKey];
          if(data[ingredientKey] !== ""){
            ingredients.push( ingredient + ", " + measure );
          }
        }
        setIngredients(ingredients)
      }

      const handleSaveRecipe = () => {
        if(user){
          if(recipe && !user.savedRecipes.includes(recipe.idMeal)) {
            saveRecipe(recipe.idMeal);
          }else {
            console.log(recipe?.idMeal +" finns redan, här är hela listan på users recept: " + user.savedRecipes )
          }
        }
      };

      const handleRemoveRecipe = () => {
        if(user){
          if(recipe && user.savedRecipes.includes(recipe.idMeal)) {
            removeRecipe(recipe.idMeal);
          }else {
            console.log(recipe?.idMeal +" finns redan, här är hela listan på users recept: " + user.savedRecipes )
          }
        }
      }

     useEffect(() => {
      console.log(localStorage);
      console.log("update saved recipes:", user?.savedRecipes);
      console.log("värdet i user, name:" + user?.name + "category:" + user?.category)
      user && localStorage.setItem(user.name, JSON.stringify(user))
     }, [user?.savedRecipes]);

    return (
        <div className="p-4">
            {recipe && (<div>
               <p>{recipe.strMeal}</p> 
               <img height="auto" width="200" src={recipe.strMealThumb}></img>
               {user?.savedRecipes.includes(recipe.idMeal) ?
                  <button className="p-2 bg-baseLight rounded my-2" onClick={handleRemoveRecipe}> Unfavorite recipe. </button>
               : (<button className="p-2 bg-baseLight rounded my-2" onClick={handleSaveRecipe}> Favorite recipe. </button>
               )}
               <p>{recipe.strInstructions}</p>
               <div className="flex flex-col">
                <p className="my-2 text-lg">Ingredients.</p>
                {ingredients && ingredients.map((item) => (
                  <p>{item}</p>
                ))}
               </div>
              </div>)}
        </div>
    )
}

export default recipePage
'use client'
import { useUserContext } from "@/utils/contexts";
 import { RecipeType, UserContextType } from "@/utils/types";
import Link from "next/link";
 import { useEffect, useState } from "react";


const categoryPage = ({params}: {params: {id:string}}) => {
    const {id} = params
    const { user } = useUserContext() as UserContextType;
  const [recipes, setRecipes] = useState<RecipeType | null >(null)

  useEffect( () => {
    const fetchRecipes = async () => {
      try {
        if (id) {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`)
          const data = await response.json();
        setRecipes(data.meals)
          
        }
      }catch (error){
        console.log(error)
      }
      
    }
    fetchRecipes();
  }, [])

  return (
    <>
      {user && (
      <div className="flex flex-col w-full justify-center items-center bg-baseColor rounded gap-4 p-2">
      Your favorite category of food is {user.category}
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
          {recipes && recipes.map((meal: RecipeType) => (
          <div className="flex flex-col justify-center items-center rounded bg-baseLight p-2 pb-6 w-full" key={meal.idMeal}>
            <Link className="flex flex-col justify-center items-center" href={`/recipe/${meal.idMeal}`}>{meal.strMeal}
            <img className="rounded object-cover max-h-[300px]" src={meal.strMealThumb}  />
            </Link>
          </div>
          ))}
        </div>
      </div>
    )}
    </>
  
  );
}
        
    

export default categoryPage;

'use client'
import { useUserContext } from "@/utils/contexts";
import { UserContextType } from "@/utils/types";
import { useEffect, useState } from "react";
import { RecipeType } from "@/utils/types";
import Link from "next/link";

export default function Home() {

  const { user } = useUserContext() as UserContextType;
  const [recipes, setRecipes] = useState<RecipeType | null >(null)

  useEffect( () => {
    const fetchRecipes = async () => {
      try {
        if (user) {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${user.category}`)
          const data = await response.json();

          const topSixRecipes = data.meals.slice(0, 6)
          setRecipes(topSixRecipes)
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
      <div className="p-4">
        <p>Hi {user.name}</p>
        <p className="mb-4">Your favorite category of food is {user.category}</p>
        <div className="flex flex-col md:grid  md:grid-cols-2 lg:grid-cols-3  justify-center items-center bg-baseAccent rounded gap-4 p-2">
          {recipes && recipes.map((meal: RecipeType) => (
            <div className="flex flex-col justify-center items-center rounded bg-baseLight p-2 pb-6 w-full" key={meal.idMeal}>
              <Link className="flex flex-col justify-center items-center" href={`/recipe/${meal.idMeal}`}>{meal.strMeal}
                <img className="rounded object-cover max-h-[300px]" src={meal.strMealThumb} />
              </Link>
            </div>
          ))}
    </div>
    
  </div>
)}
  
  </>
  
  );
}

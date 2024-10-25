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

          const topFiveRecipes = data.meals.slice(0, 5)
          setRecipes(topFiveRecipes)
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
  <div className="">
    Your favorite category of food is {user.category}

    {recipes && recipes.map((meal: RecipeType) => (
      <div key={meal.idMeal}>
        <Link href={`/recipe/${meal.idMeal}`}>{meal.strMeal}
        </Link>
        <img src={meal.strMealThumb} height="auto" width="200px" />
      </div>
    ))}
  </div>
)}
  
  </>
  
  );
}

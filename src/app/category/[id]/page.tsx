'use client'
<<<<<<< HEAD

import { RecipeType } from "@/utils/types"
import { useEffect, useState } from "react"
import Link from "next/link";


const categoryPage = ({params}: {params: {id:string}}  ) => {
    const {id} = params
    const [recipes, setRecipes] = useState<RecipeType | null >(null)

    useEffect( () => {
        const fetchRecipes = async () => {
          try {
            if (id) {
              const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`)
              console.log(id)
              const data = await response.json();
              console.log(data)
              setRecipes(data.meals)
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
            {recipes && recipes.map((meal: RecipeType) => (
            <div key={meal.idMeal}>
              <Link href={`/recipe/${meal.idMeal}`}>{meal.strMeal}
              </Link>
              <img src={meal.strMealThumb} height="auto" width="200px" />
            </div>
          ))}
        </div>
    )
}

export default categoryPage
=======
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
        
    

export default categoryPage;
>>>>>>> 23f7cbfd9436a60489f33899525b04dc5ee309ab

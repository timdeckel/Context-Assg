export type UserType = {
    name:string,
    category: string,
    savedRecipes: string[]
}

export type UserContextType = {
    user: UserType | null,
    setUser: (user:UserType) => void
}

export type RecipeType = {
    map(arg0: (meal: RecipeType) => import("react").JSX.Element): import("react").ReactNode
    strMeal: string,
    idMeal: string,
    strMealThumb: string,
    strArea?: string,
    strInstructions?: string,

}



// name = data.strMeal
// id = data.idMeal
// image = data.strMealThumb

// ourRecipe = {...data}
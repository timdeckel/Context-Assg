'use client'
import { createContext, useContext, useState } from 'react';
import { UserContextType, UserType } from './types';

const UserContext = createContext<UserContextType | null>(null)

export const UserProvider = ({children}:{children:React.ReactNode}) => {
    const [user, setUser] = useState<UserType | null>(null)

    const saveRecipe = (recipe: string) => {
        //user?.savedRecipes.push(recipe);
        if (user) {
            setUser({
                ...user,
                savedRecipes: [...user.savedRecipes, recipe],
            
            });
        }
    };

    const removeRecipe = (recipe: string) => {
        if (user) {
            const updatedSavedRecipes = user.savedRecipes.filter(
                (savedRecipe) => savedRecipe !== recipe
            );

            setUser({
                ...user,
                savedRecipes: updatedSavedRecipes,
            })
        }
    }

    /*let removeRecipeIndex = user.savedRecipes.indexOf(recipe)
            if(removeRecipeIndex > -1 ) {
              user.savedRecipes.splice(removeRecipeIndex, 1);
            }
            
        } */
    return (
        <UserContext.Provider value={{user, setUser, saveRecipe, removeRecipe}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext)
}
'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { UserContextType, UserType } from './types';

const UserContext = createContext<UserContextType | null>(null)

export const UserProvider = ({children}:{children:React.ReactNode}) => {
    const [user, setUser] = useState<UserType | null>(null)

    const saveRecipe = (recipe: string) => {
        if (user) {
            setUser({
                ...user,
                savedRecipes: [...user.savedRecipes, recipe],
            
            });
        }
    };

    const changeFavoriteCategory = (newCategory: string) => {
        if (user && user.category !== newCategory) {
            setUser({ ...user, category: newCategory})
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

    return (
        <UserContext.Provider value={{user, setUser, saveRecipe, removeRecipe, changeFavoriteCategory}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext)
}
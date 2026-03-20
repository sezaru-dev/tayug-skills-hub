'use client'
import { Category } from '@/features/admin/categories/types'
import React, { createContext, useContext } from 'react'

type CategoriesProviderProps = {
 children: React.ReactNode
 initialData: Pick<Category, "id" | "name">[]
}

const CategoriesContext = createContext<Pick<Category, "id" | "name">[]>([])

export const CategoriesProvider = ({children, initialData}: CategoriesProviderProps) => {
  return (
    <CategoriesContext.Provider value={initialData}>
      {children}
    </CategoriesContext.Provider>
  )
}

export const useCategoriesContext = () => {
  return useContext(CategoriesContext)
}
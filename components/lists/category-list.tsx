'use client'

import { useGetAllCategories } from '@/hooks/category/get-all-categories'
import { CategoryCard } from '../cards/category-card'
import { Category, Subcategory } from '@/lib/types/tables.types'

export const CategoryList = () => {
  const { data: allCategories, isFetching } = useGetAllCategories()

  if (isFetching) {
    return <p>Loading...</p>
  }

  if (!allCategories || allCategories.length === 0) {
    return <p>No categories found</p>
  }

  const categories = allCategories.filter((x) => !x.parent_id) as Category[]
  const subcategories = allCategories.filter((x) => x.parent_id) as Subcategory[]

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          subcategories={subcategories.filter(
            (subcategory) => subcategory.parent_id === category.id
          )}
        />
      ))}
    </div>
  )
}

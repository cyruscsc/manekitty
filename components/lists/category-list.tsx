'use client'

import { useGetCategories } from '@/hooks/category/get-categories'
import { CategoryCard } from '../cards/category-card'

export const CategoryList = () => {
  const { data: categories, isFetching } = useGetCategories()

  if (isFetching) {
    return <p>Loading...</p>
  }

  if (!categories || categories.length === 0) {
    return <p>No categories found</p>
  }

  const parentCategories = categories.filter((category) => !category.parent_id)
  const childCategories = categories.filter((category) => category.parent_id)

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
      {parentCategories.map((parentCategory) => (
        <CategoryCard
          key={parentCategory.id}
          parent_category={parentCategory}
          child_categories={childCategories.filter(
            (category) => category.parent_id === parentCategory.id
          )}
        />
      ))}
    </div>
  )
}

import { Category, Subcategory } from '@/lib/types/tables.types'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { SubcategoryBadge } from '../badges/subcategory-badge'
import { Color } from '@/lib/types/enums.types'
import { CategoryProvider } from '../providers/category-provider'
import { SubcategoryProvider } from '../providers/subcategory-provider'
import { FormModal } from '../modals/form-modal'
import { AddSubcategoryForm } from '../forms/add-subcategory-form'
import { Button } from '../ui/button'
import { Pencil, Plus } from 'lucide-react'
import { EditCategoryForm } from '../forms/edit-category-form'

interface CategoryCardProps {
  category: Category
  subcategories: Subcategory[]
}

export const CategoryCard = ({
  category,
  subcategories,
}: CategoryCardProps) => {
  return (
    <CategoryProvider category={category}>
      <Card>
        <CardHeader>
          <CardTitle>{category.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {subcategories.map((subcategory) => (
            <SubcategoryProvider key={subcategory.id} subcategory={subcategory}>
              <SubcategoryBadge
                name={subcategory.name}
                color={subcategory.color as Color}
                clickable={true}
              />
            </SubcategoryProvider>
          ))}
        </CardContent>
        <CardFooter>
          <FormModal
            title='Add subcategory'
            trigger={
              <Button>
                <Plus />
              </Button>
            }
            form={<AddSubcategoryForm />}
          />
          <FormModal
            title='Edit category'
            trigger={
              <Button variant='secondary'>
                <Pencil />
              </Button>
            }
            form={<EditCategoryForm />}
          />
        </CardFooter>
      </Card>
    </CategoryProvider>
  )
}

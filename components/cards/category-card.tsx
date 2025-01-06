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
import { EditCategoryResponsiveDialog } from '../responsive-dialogs/edit-category-responsive-dialog'
import { CategoryProvider } from '../providers/category-provider'
import { SubcategoryProvider } from '../providers/subcategory-provider'
import { AddSubcategoryResponsiveDialog } from '../responsive-dialogs/add-subcategory-responsive-dialog'

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
          <AddSubcategoryResponsiveDialog />
          <EditCategoryResponsiveDialog />
        </CardFooter>
      </Card>
    </CategoryProvider>
  )
}

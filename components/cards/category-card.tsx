import { Category } from '@/lib/types/tables.types'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { CategoryBadge } from '../badges/category-badge'
import { Color } from '@/lib/types/enums.types'
import { EditCategoryResponsiveDialog } from '../responsive-dialogs/edit-category-responsive-dialog'
import { CategoryProvider } from '../providers/category-provider'

interface CategoryCardProps {
  parent_category: Category
  child_categories: Category[]
}

export const CategoryCard = ({
  parent_category,
  child_categories,
}: CategoryCardProps) => {
  return (
    <CategoryProvider category={parent_category}>
      <Card>
        <CardHeader>
          <CardTitle>{parent_category.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {child_categories.map((category) => (
            <CategoryProvider key={category.id} category={category}>
              <CategoryBadge
                name={category.name}
                color={category.color as Color}
                clickable={true}
              />
            </CategoryProvider>
          ))}
        </CardContent>
        <CardFooter>
          <EditCategoryResponsiveDialog />
        </CardFooter>
      </Card>
    </CategoryProvider>
  )
}

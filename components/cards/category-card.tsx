import { Category } from '@/lib/types/tables.types'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { CategoryBadge } from '../badges/category-badge'
import { Color } from '@/lib/types/enums.types'

interface CategoryCardProps {
  parent_category: Category
  child_categories: Category[]
}

export const CategoryCard = ({
  parent_category,
  child_categories,
}: CategoryCardProps) => {
  return <Card>
    <CardHeader>
      <CardTitle>{parent_category.name}</CardTitle>
    </CardHeader>
    <CardContent>
      {child_categories.map((category) => (
        <CategoryBadge
          key={category.id}
          name={category.name}
          color={category.color as Color}
        />
      ))}
    </CardContent>
  </Card>
}

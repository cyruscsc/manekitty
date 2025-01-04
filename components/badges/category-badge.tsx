import { Color } from '@/lib/types/enums.types'
import { ColorDot } from '../basics/color-dot'
import { Badge } from '../ui/badge'

interface CategoryBadgeProps {
  name: string
  color: Color
}

export const CategoryBadge = ({ name, color }: CategoryBadgeProps) => {
  return (
    <Badge variant='outline'>
      <ColorDot color={color} type='category' className='mr-1' />
      {name}
    </Badge>
  )
}

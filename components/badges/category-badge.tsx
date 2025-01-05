import { Color } from '@/lib/types/enums.types'
import { ColorDot } from '../basics/color-dot'
import { Badge } from '../ui/badge'
import { useState } from 'react'
import { useMediaQuery } from '@/hooks/ui/media-query'
import { EditCategoryDialog } from '../dialogs/edit-category-dialog'
import { EditCategoryDrawer } from '../drawers/edit-category-drawer'

interface CatBadgeProps {
  name: string
  color: Color
  role?: string
}

interface CategoryBadgeProps {
  name: string
  color: Color
  clickable?: boolean
}

export const CatBadge = ({ name, color }: CatBadgeProps) => {
  return (
    <Badge variant='outline'>
      <ColorDot color={color} type='category' className='mr-1' />
      {name}
    </Badge>
  )
}

export const CategoryBadge = ({
  name,
  color,
  clickable,
}: CategoryBadgeProps) => {
  if (!clickable) {
    return <CatBadge name={name} color={color} />
  }

  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const childProps = {
    open,
    setOpen,
    trigger: (
      <button>
        <CatBadge name={name} color={color} />
      </button>
    ),
  }

  return isDesktop ? (
    <EditCategoryDialog {...childProps} />
  ) : (
    <EditCategoryDrawer {...childProps} />
  )
}

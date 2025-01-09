import { Color } from '@/lib/types/enums.types'
import { ColorDot } from '../basics/color-dot'
import { Badge } from '../ui/badge'
import { useState } from 'react'
import { useMediaQuery } from '@/hooks/ui/media-query'
import { EditSubcategoryDialog } from '../dialogs/edit-subcategory-dialog'
import { EditSubcategoryDrawer } from '../drawers/edit-subcategory-drawer'

interface SubcatBadgeProps {
  name: string
  color: Color
  role?: string
}

interface SubcategoryBadgeProps {
  name: string
  color: Color
  clickable?: boolean
}

export const SubcatBadge = ({ name, color }: SubcatBadgeProps) => {
  return (
    <Badge variant='outline'>
      <ColorDot color={color} size='sm' type='category' className='mr-1' />
      {name}
    </Badge>
  )
}

export const SubcategoryBadge = ({
  name,
  color,
  clickable,
}: SubcategoryBadgeProps) => {
  if (!clickable) {
    return <SubcatBadge name={name} color={color} />
  }

  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const childProps = {
    open,
    setOpen,
    trigger: (
      <button>
        <SubcatBadge name={name} color={color} />
      </button>
    ),
  }

  return isDesktop ? (
    <EditSubcategoryDialog {...childProps} />
  ) : (
    <EditSubcategoryDrawer {...childProps} />
  )
}

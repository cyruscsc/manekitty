import { Color } from '@/lib/types/enums.types'
import { ColorDot } from '../basics/color-dot'
import { Badge } from '../ui/badge'
import { FormModal } from '../modals/form-modal'
import { EditSubcategoryForm } from '../forms/edit-subcategory-form'

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

const SubcatBadge = ({ name, color }: SubcatBadgeProps) => {
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
  return clickable ? (
    <FormModal
      title='Edit subcategory'
      trigger={
        <button>
          <SubcatBadge name={name} color={color} />
        </button>
      }
      form={<EditSubcategoryForm />}
    />
  ) : (
    <SubcatBadge name={name} color={color} />
  )
}

import { Pencil1Icon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'

interface EditAccountButtonProps {
  accountID: string
}

export const EditAccountButton = ({ accountID }: EditAccountButtonProps) => {
  return (
    <Button variant='secondary'>
      <Pencil1Icon />
    </Button>
  )
}

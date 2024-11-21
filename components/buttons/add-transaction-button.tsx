import { Button } from '../ui/button'
import { PlusIcon } from '@radix-ui/react-icons'

interface AddTransactionButtonProps {
  accountID?: string
}

export const AddTransactionButton = ({
  accountID,
}: AddTransactionButtonProps) => {
  return (
    <Button>
      <PlusIcon />
    </Button>
  )
}

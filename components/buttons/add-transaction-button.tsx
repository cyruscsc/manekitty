import { Button } from '../ui/button'
import { Plus } from 'lucide-react';

interface AddTransactionButtonProps {
  accountID?: string
}

export const AddTransactionButton = ({
  accountID,
}: AddTransactionButtonProps) => {
  return (
    <Button>
      <Plus />
    </Button>
  )
}

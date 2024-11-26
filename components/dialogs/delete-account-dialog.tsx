import { useCurrentAccount } from '@/hooks/account/current-account'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { TrashIcon } from '@radix-ui/react-icons'
import { useDeleteAccount } from '@/hooks/account/delete-account'

export const DeleteAccountDialog = () => {
  const { account } = useCurrentAccount()
  const { mutateAsync: deleteAccount, isPending } = useDeleteAccount()
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='ghost'>
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure to delete {account.name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{' '}
            {account.name} and all its transactions.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={() => deleteAccount(account.id)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

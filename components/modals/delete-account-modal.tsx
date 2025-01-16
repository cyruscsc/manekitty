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
import { Trash } from 'lucide-react'
import { useDeleteAccount } from '@/hooks/account/delete-account'
import { useToast } from '@/hooks/ui/use-toast'

export const DeleteAccountModal = () => {
  const { account } = useCurrentAccount()
  const { mutateAsync: deleteAccount, isPending } = useDeleteAccount()
  const { toast } = useToast()

  const handleDelete = async () => {
    try {
      await deleteAccount(account.id)
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Failed to delete account',
      })
      console.error(error)
    }
    toast({
      description: 'Account deleted successfully',
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='ghost'>
          <Trash />
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
          <AlertDialogAction disabled={isPending} onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

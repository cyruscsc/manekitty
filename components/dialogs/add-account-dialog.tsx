import { Dispatch, ReactNode, SetStateAction } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

interface AddAccountDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  trigger: ReactNode
}

export const AddAccountDialog = ({
  open,
  setOpen,
  trigger,
}: AddAccountDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Account</DialogTitle>
          <DialogDescription>
            Add a account to record transactions.
          </DialogDescription>
        </DialogHeader>
        <div>Form goes here</div>
      </DialogContent>
    </Dialog>
  )
}

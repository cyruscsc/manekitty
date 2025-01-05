import { Dispatch, ReactNode, SetStateAction } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

interface EditCategoryDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  trigger: ReactNode
}

export const EditCategoryDialog = ({
  open,
  setOpen,
  trigger,
}: EditCategoryDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        {/* <EditCategoryForm /> */}
      </DialogContent>
    </Dialog>
  )
}

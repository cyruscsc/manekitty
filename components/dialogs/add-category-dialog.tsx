import { Dispatch, ReactNode, SetStateAction } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { AddCategoryForm } from '../forms/add-category-form'

interface AddCategoryDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  trigger: ReactNode
}

export const AddCategoryDialog = ({
  open,
  setOpen,
  trigger,
}: AddCategoryDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add category</DialogTitle>
        </DialogHeader>
        <AddCategoryForm />
      </DialogContent>
    </Dialog>
  )
}

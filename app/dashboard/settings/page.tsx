import { CreateDefaultCategoriesButton } from '@/components/buttons/create-default-categories-button'
import { SignOutButton } from '@/components/buttons/sign-out-button'
import { ProfileForm } from '@/components/forms/profile-form'
import { CategoryList } from '@/components/lists/category-list'
import { AddCategoryResponsiveDialog } from '@/components/responsive-dialogs/add-category-responsive-dialog'
import { Separator } from '@/components/ui/separator'

const page = () => (
  <>
    <ProfileForm />
    <Separator className='my-4' />
    <CreateDefaultCategoriesButton />
    <AddCategoryResponsiveDialog />
    <CategoryList />
    <Separator className='my-4' />
    <SignOutButton />
  </>
)

export default page

import { CreateDefaultCategoriesButton } from '@/components/buttons/create-default-categories-button'
import { SignOutButton } from '@/components/buttons/sign-out-button'
import { AddCategoryForm } from '@/components/forms/add-category-form'
import { ProfileForm } from '@/components/forms/profile-form'
import { CategoryList } from '@/components/lists/category-list'
import { FormModal } from '@/components/modals/form-modal'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const page = () => (
  <>
    <ProfileForm />
    <Separator className='my-4' />
    <CreateDefaultCategoriesButton />
    <FormModal
      title='Add category'
      trigger={<Button>Add category</Button>}
      form={<AddCategoryForm />}
    />
    <CategoryList />
    <Separator className='my-4' />
    <SignOutButton />
  </>
)

export default page

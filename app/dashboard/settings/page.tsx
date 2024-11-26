import { CreateDefaultCategoriesButton } from '@/components/buttons/create-default-categories-button'
import { SignOutButton } from '@/components/buttons/sign-out-button'
import { ProfileForm } from '@/components/forms/profile-form'
import { Separator } from '@/components/ui/separator'

const page = () => (
  <>
    <ProfileForm />
    <Separator className='my-4' />
    <CreateDefaultCategoriesButton />
    <Separator className='my-4' />
    <SignOutButton />
  </>
)

export default page

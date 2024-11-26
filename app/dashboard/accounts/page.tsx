import { AddAccountResponsiveDialog } from '@/components/responsive-dialogs/add-account-responsive-dialog'
import { AccountList } from '@/components/lists/account-list'

const page = () => {
  return (
    <>
      <AccountList />
      <AddAccountResponsiveDialog />
    </>
  )
}

export default page

import { AddAccountResponsiveDialog } from '@/components/responsive-dialogs/add-account-responsive-dialog'
import { AccountTable } from '@/components/tables/account-table'

const page = () => {
  return (
    <>
      <AccountTable />
      <AddAccountResponsiveDialog />
    </>
  )
}

export default page

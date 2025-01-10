import { AccountList } from '@/components/lists/account-list'
import { FormModal } from '@/components/modals/form-modal'
import { Button } from '@/components/ui/button'
import { AddAccountForm } from '@/components/forms/add-account-form'

const page = () => {
  return (
    <>
      <AccountList />

      <FormModal
        title='Add account'
        trigger={<Button>Add account</Button>}
        form={<AddAccountForm />}
      />
    </>
  )
}

export default page

import { AddTransactionForm } from '@/components/forms/add-transaction-form'
import { FormModal } from '@/components/modals/form-modal'
import { Button } from '@/components/ui/button'

const page = () => {
  return (
    <div>
      <FormModal
        title='Add transaction'
        trigger={<Button>Add transaction</Button>}
        form={<AddTransactionForm />}
      />
    </div>
  )
}

export default page

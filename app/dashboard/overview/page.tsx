import { AccountCombobox } from '@/components/comboboxes/account-combobox'
import { CategoryCombobox } from '@/components/comboboxes/category-combobox'

const page = () => {
  return (
    <div>
      Overview
      <AccountCombobox />
      <CategoryCombobox />
    </div>
  )
}

export default page

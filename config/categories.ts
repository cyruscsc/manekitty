import { Color } from '@/lib/types/enums.types'

type defaultParentCategory = {
  color: Color
  name: string
}

export const defaultParentCategories: defaultParentCategory[] = [
  { color: 'slate', name: 'Other' },
  { color: 'fuchsia', name: 'Entertainment' },
  { color: 'blue', name: 'Food & Drinks' },
  { color: 'orange', name: 'Housing' },
  { color: 'emerald', name: 'Income' },
  { color: 'rose', name: 'Lifestyle' },
  { color: 'cyan', name: 'Savings' },
  { color: 'violet', name: 'Transportation' },
]

const defaultParents = defaultParentCategories.map((x) => x.name)

type defaultChildCategory = {
  name: string
  parent: (typeof defaultParents)[number]
}

export const defaultChildCategories: defaultChildCategory[] = [
  { name: 'Bank', parent: 'Other' },
  { name: 'Miscellaneous', parent: 'Other' },
  { name: 'Taxes', parent: 'Other' },
  { name: 'Unknown', parent: 'Other' },

  { name: 'Hobby', parent: 'Entertainment' },
  { name: 'Sports', parent: 'Entertainment' },
  { name: 'Subscription', parent: 'Entertainment' },
  { name: 'Vacation', parent: 'Entertainment' },

  { name: 'Drinks', parent: 'Food & Drinks' },
  { name: 'Food', parent: 'Food & Drinks' },
  { name: 'Groceries', parent: 'Food & Drinks' },
  { name: 'Restaurant', parent: 'Food & Drinks' },

  { name: 'Bills', parent: 'Housing' },
  { name: 'Insurance', parent: 'Housing' },
  { name: 'Mortgage', parent: 'Housing' },
  { name: 'Maintainence', parent: 'Housing' },
  { name: 'Rent', parent: 'Housing' },
  { name: 'Supplies', parent: 'Housing' },

  { name: 'Benefit', parent: 'Income' },
  { name: 'Interest', parent: 'Income' },
  { name: 'Investment', parent: 'Income' },
  { name: 'Salary', parent: 'Income' },

  { name: 'Childcare', parent: 'Lifestyle' },
  { name: 'Education', parent: 'Lifestyle' },
  { name: 'Gift', parent: 'Lifestyle' },
  { name: 'Health', parent: 'Lifestyle' },
  { name: 'Personal', parent: 'Lifestyle' },
  { name: 'Shopping', parent: 'Lifestyle' },

  { name: 'Emergency', parent: 'Savings' },
  { name: 'Savings', parent: 'Savings' },
  { name: 'Vacation', parent: 'Savings' },

  { name: 'Car', parent: 'Transportation' },
  { name: 'Gas', parent: 'Transportation' },
  { name: 'Insurance', parent: 'Transportation' },
  { name: 'Parking', parent: 'Transportation' },
  { name: 'Transport', parent: 'Transportation' },
  { name: 'Taxi', parent: 'Transportation' },
]

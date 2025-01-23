import { useGetAllCategories } from '@/hooks/category/get-all-categories'
import { Transaction } from '@/lib/types/tables.types'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { SubcategoryBadge } from '../badges/subcategory-badge'
import { Color } from '@/lib/types/enums.types'
import { TransactionProvider } from '../providers/transaction-provider'
import { FormModal } from '../modals/form-modal'
import { EditTransactionForm } from '../forms/edit-transaction-form'

interface TransactionsCardProps {
  date: string
  transactions: Transaction[]
}

export const TransactionsCard = ({
  date,
  transactions,
}: TransactionsCardProps) => {
  const { data: categories } = useGetAllCategories()
  const category = categories?.find(
    (category) => category.id === transactions[0].category_id
  )

  if (transactions.length === 0) return <div>No transactions</div>
  if (!category) return <div>Loading...</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>{date}</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.map((transaction) => (
          <TransactionProvider key={transaction.id} transaction={transaction}>
            <FormModal
              title='Edit transaction'
              trigger={
                <button className='block w-full'>
                  <div className='flex items-center justify-between py-2'>
                    <div className=''>
                      <div>{transaction.note || category?.name}</div>
                      <SubcategoryBadge
                        name={category?.name || ''}
                        color={category?.color as Color}
                      />
                    </div>
                    <div>{transaction.amount}</div>
                  </div>
                </button>
              }
              form={<EditTransactionForm />}
            />
          </TransactionProvider>
        ))}
      </CardContent>
    </Card>
  )
}

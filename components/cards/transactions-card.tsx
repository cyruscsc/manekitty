import { useGetAllCategories } from '@/hooks/category/get-all-categories'
import { Account, CategoryGeneric, Transaction } from '@/lib/types/tables.types'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { SubcategoryBadge } from '../badges/subcategory-badge'
import { Color } from '@/lib/types/enums.types'
import { TransactionProvider } from '../providers/transaction-provider'
import { FormModal } from '../modals/form-modal'
import { EditTransactionForm } from '../forms/edit-transaction-form'

interface TransactionsCardProps {
  date: string
  transactions: Array<
    Transaction & { account: Account | null; category: CategoryGeneric | null }
  >
}

export const TransactionsCard = ({
  date,
  transactions,
}: TransactionsCardProps) => {
  const { data: categories } = useGetAllCategories()

  if (transactions.length === 0) return <div>No transactions</div>

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
                      <div>
                        {transaction.note || transaction.category?.name}
                      </div>
                      <SubcategoryBadge
                        name={transaction.category?.name || ''}
                        color={transaction.category?.color as Color}
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

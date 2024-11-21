import { Account } from '@/lib/types/tables.types'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { AddTransactionButton } from '../buttons/add-transaction-button'
import { EditAccountButton } from '../buttons/edit-account-button'
import { colors } from '@/config/colors'
import { ColorDot } from '../basics/color-dot'

interface AccountCardProps {
  account: Account
}

export const AccountCard = ({ account }: AccountCardProps) => {
  return (
    <>
      <ColorDot
        color={account.color as keyof typeof colors}
        className='relative -left-1 top-3'
      />
      <Card className='flex justify-between'>
        <CardHeader>
          <CardTitle>{account.name}</CardTitle>
          <CardDescription>$123456789.00</CardDescription>
        </CardHeader>
        <CardFooter className='py-0 gap-2'>
          <AddTransactionButton accountID={account.id} />
          <EditAccountButton accountID={account.id} />
        </CardFooter>
      </Card>
    </>
  )
}

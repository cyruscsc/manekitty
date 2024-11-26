import { Account } from '@/lib/types/tables.types'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { AddTransactionButton } from '../buttons/add-transaction-button'
import { colors } from '@/config/colors'
import { ColorDot } from '../basics/color-dot'
import { EditAccountResponsiveDialog } from '../responsive-dialogs/edit-account-responsive-dialog'
import { AccountProvider } from '../providers/account-provider'
import { DeleteAccountDialog } from '../dialogs/delete-account-dialog'

interface AccountCardProps {
  account: Account
}

export const AccountCard = ({ account }: AccountCardProps) => {
  return (
    <AccountProvider account={account}>
      <ColorDot
        color={account.color as keyof typeof colors}
        type='account'
        className='relative -left-1 top-3'
      />
      <Card className='flex justify-between'>
        <CardHeader>
          <CardTitle>{account.name}</CardTitle>
          <CardDescription>$123456789.00</CardDescription>
        </CardHeader>
        <CardFooter className='py-0 gap-2'>
          <AddTransactionButton accountID={account.id} />
          <EditAccountResponsiveDialog />
          <DeleteAccountDialog />
        </CardFooter>
      </Card>
    </AccountProvider>
  )
}

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
import { AccountProvider } from '../providers/account-provider'
import { DeleteAccountModal } from '../modals/delete-account-modal'
import { FormModal } from '../modals/form-modal'
import { Button } from '../ui/button'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { EditAccountForm } from '../forms/edit-account-form'

interface AccountCardProps {
  account: Account
}

export const AccountCard = ({ account }: AccountCardProps) => {
  return (
    <AccountProvider account={account}>
      <ColorDot
        color={account.color as keyof typeof colors}
        size='lg'
        type='account'
        className='relative -left-1 top-3'
      />
      <Card className='flex justify-between'>
        <CardHeader>
          <CardTitle>{account.name}</CardTitle>
          <CardDescription>${account.balance}</CardDescription>
        </CardHeader>
        <CardFooter className='py-0 gap-2'>
          <AddTransactionButton accountID={account.id} />
          <FormModal
            title='Edit account'
            trigger={
              <Button variant='secondary'>
                <Pencil1Icon />
              </Button>
            }
            form={<EditAccountForm />}
          />
          <DeleteAccountModal />
        </CardFooter>
      </Card>
    </AccountProvider>
  )
}

import { Account } from '@/lib/types/tables.types'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { colors } from '@/config/colors'
import { ColorDot } from '../basics/color-dot'
import { AccountProvider } from '../providers/account-provider'
import { FormModal } from '../modals/form-modal'
import { Button } from '../ui/button'
import { Pencil } from 'lucide-react'
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
          <FormModal
            title='Edit account'
            trigger={
              <Button variant='ghost' size='icon'>
                <Pencil />
              </Button>
            }
            form={<EditAccountForm />}
          />
        </CardFooter>
      </Card>
    </AccountProvider>
  )
}

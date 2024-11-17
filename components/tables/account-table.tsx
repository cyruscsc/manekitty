'use client'

import { useGetAccounts } from '@/hooks/accounts/get-accounts'

export const AccountTable = () => {
  const { data: accounts, isFetching } = useGetAccounts()

  return (
    <div>
      <h1>Accounts:</h1>
      {accounts?.length}
    </div>
  )
}

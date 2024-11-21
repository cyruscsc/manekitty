'use client'

import { useGetAccounts } from '@/hooks/accounts/get-accounts'
import { AccountCard } from '../cards/account-card'

export const AccountTable = () => {
  const { data: accounts, isFetching } = useGetAccounts()

  if (isFetching) {
    return <p>Loading...</p>
  }

  if (!accounts || accounts.length === 0) {
    return <p>No accounts found</p>
  }

  return (
    <>
      {accounts.map((account) => (
        <AccountCard key={account.id} account={account} />
      ))}
    </>
  )
}

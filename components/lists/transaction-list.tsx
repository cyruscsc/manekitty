'use client'

import { useEffect, useState } from 'react'
import { YearSelect } from '../selects/year-select'
import { MonthSelect } from '../selects/month-select'
import { lastDayOfMonthInString } from '@/lib/utils'
import { useGetTransactions } from '@/hooks/transaction/get-transactions'
import { TransactionsCard } from '../cards/transactions-card'

export const TransactionList = () => {
  const [year, setYear] = useState(() => new Date().getFullYear().toString())
  const [month, setMonth] = useState(() =>
    (new Date().getMonth() + 1).toString()
  )

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const { data: transactions } = useGetTransactions(startDate, endDate)

  const transactionsByDate =
    transactions && Object.groupBy(transactions, ({ date }) => date)

  useEffect(() => {
    setStartDate(year + '-' + month + '-01')
    setEndDate(year + '-' + month + '-' + lastDayOfMonthInString(year, month))
  }, [year, month])

  return (
    <>
      <div className='flex gap-4'>
        <YearSelect year={year} setYear={setYear} />
        <MonthSelect month={month} setMonth={setMonth} />
      </div>
      {transactionsByDate &&
        Object.keys(transactionsByDate).map((date) => (
          <TransactionsCard
            key={date}
            date={date}
            transactions={transactionsByDate[date] || []}
          />
        ))}
    </>
  )
}

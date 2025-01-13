import { Dispatch, SetStateAction } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { months } from '@/config/dates'
import { Label } from '../ui/label'

interface MonthSelectProps {
  month: string
  setMonth: Dispatch<SetStateAction<string>>
}

export const MonthSelect = ({ month, setMonth }: MonthSelectProps) => {
  return (
    <div className='flex items-center gap-4'>
      <Label>Month</Label>
      <Select value={month} onValueChange={setMonth}>
        <SelectTrigger className='w-20'>
          <SelectValue placeholder='Select month' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {months.map((month) => (
              <SelectItem key={month} value={month.toString()}>
                {month}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

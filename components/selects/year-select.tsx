import { Dispatch, SetStateAction } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { years } from '@/config/dates'
import { Label } from '../ui/label'

interface YearSelectProps {
  year: string
  setYear: Dispatch<SetStateAction<string>>
}

export const YearSelect = ({ year, setYear }: YearSelectProps) => {
  return (
    <div className='flex items-center gap-4'>
      <Label>Year</Label>
      <Select value={year} onValueChange={setYear} >
        <SelectTrigger className='w-20'>
          <SelectValue placeholder='Select year' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

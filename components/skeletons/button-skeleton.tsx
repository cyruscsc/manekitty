import { Skeleton } from '../ui/skeleton'

export const ButtonSkeleton = () => {
  return (
    <div className='inline-flex border rounded-2xl h-9 w-24 px-4 py-2'>
      <Skeleton className='h-full w-full bg-accent' />
    </div>
  )
}

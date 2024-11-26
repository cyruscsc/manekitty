import { getCategories } from '@/lib/actions/category/get-categories'
import { useQuery } from '@tanstack/react-query'

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
}

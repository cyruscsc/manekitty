import { getAllCategories } from '@/lib/actions/category/get-all-categories'
import { useQuery } from '@tanstack/react-query'

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  })
}

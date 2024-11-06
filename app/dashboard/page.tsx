import { redirect } from 'next/navigation'
import { routes } from '@/config/routes'

const page = () => {
  return redirect(routes.overview.href)
}

export default page

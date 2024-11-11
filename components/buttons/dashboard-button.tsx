import { Button } from '../ui/button'
import { redirect } from 'next/navigation'
import { routes } from '@/config/routes'

export const DashboardButton = () => {
  return (
    <Button variant='outline' onClick={() => redirect(routes.dashboard.href)}>
      Dashboard
    </Button>
  )
}

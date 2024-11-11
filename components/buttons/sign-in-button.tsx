import { redirect } from 'next/navigation'
import { routes } from '@/config/routes'
import { Button } from '../ui/button'

export const SignInButton = () => {
  return (
    <Button variant='outline' onClick={() => redirect(routes.auth.href)}>
      Sign in
    </Button>
  )
}

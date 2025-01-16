import { NavigationMenu, NavigationMenuList } from '../ui/navigation-menu'
import { NavItem } from './nav-item'
import {
  ArrowLeftRight,
  ChartNoAxesGantt,
  CreditCard,
  Settings2,
} from 'lucide-react'
import { routes } from '@/config/routes'

export const NavMenu = () => {
  return (
    <NavigationMenu className='mx-auto my-2 p-1 bg-background rounded-2xl border fixed top-0 inset-x-0'>
      <NavigationMenuList>
        <NavItem
          href={routes.overview.href}
          label={<ChartNoAxesGantt size={20} />}
        />
        <NavItem
          href={routes.transactions.href}
          label={<ArrowLeftRight size={20} />}
        />
        <NavItem href={routes.accounts.href} label={<CreditCard size={20} />} />
        <NavItem href={routes.settings.href} label={<Settings2 size={20} />} />
      </NavigationMenuList>
    </NavigationMenu>
  )
}

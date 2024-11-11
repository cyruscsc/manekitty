import { NavigationMenu, NavigationMenuList } from '../ui/navigation-menu'
import { NavItem } from './nav-item'
import { GearIcon } from '@radix-ui/react-icons'
import { routes } from '@/config/routes'

export const NavMenu = () => (
  <NavigationMenu className='mx-auto my-2 p-1 bg-background rounded-2xl border fixed top-0 inset-x-0'>
    <NavigationMenuList>
      <NavItem href={routes.overview.href} label={routes.overview.name} />
      <NavItem
        href={routes.transactions.href}
        label={routes.transactions.name}
      />
      <NavItem href={routes.accounts.href} label={routes.accounts.name} />
      <NavItem href={routes.settings.href} label={<GearIcon />} />
    </NavigationMenuList>
  </NavigationMenu>
)

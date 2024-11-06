import { NavigationMenu, NavigationMenuList } from '../ui/navigation-menu'
import { NavDropdown } from './nav-dropdown'
import { NavItem } from './nav-item'
import { GearIcon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import { routes } from '@/config/routes'

export const NavMenu = () => {
  const currentLedger = 'Current Ledger'
  const ledgers = [
    { href: '', label: 'Ledger 1' },
    { href: '', label: 'Ledger 2' },
  ]
  const navDropdownItems = [
    { href: routes.overview.href, label: routes.overview.name },
    { href: routes.transactions.href, label: routes.transactions.name },
    { href: routes.accounts.href, label: routes.accounts.name },
  ]
  return (
    <NavigationMenu className='mx-auto my-2 p-1 rounded-2xl border fixed top-0 inset-x-0'>
      <NavigationMenuList>
        <NavDropdown trigger={currentLedger} navItems={ledgers} />
        <NavDropdown
          trigger={<HamburgerMenuIcon />}
          navItems={navDropdownItems}
        />
        <NavItem href={routes.settings.href} label={<GearIcon />} />
      </NavigationMenuList>
    </NavigationMenu>
  )
}

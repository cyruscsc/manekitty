import { ReactNode } from 'react'
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '../ui/navigation-menu'

interface NavDropdownProps {
  trigger: ReactNode
  navItems: { href: string; label: string }[]
}

export const NavDropdown = ({ trigger, navItems }: NavDropdownProps) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{trigger}</NavigationMenuTrigger>
      <NavigationMenuContent className='left-auto right-0'>
        <ul className='w-32 p-1'>
          {navItems.map((x) => (
            <li key={x.label}>
              <NavigationMenuLink asChild>
                <a
                  href={x.href}
                  className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                >
                  <div className='text-sm font-medium leading-none'>
                    {x.label}
                  </div>
                </a>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

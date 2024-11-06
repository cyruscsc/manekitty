import Link from 'next/link'
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu'
import { Routes } from '@/config/routes'
import { ReactNode } from 'react'

interface NavItemProps {
  href: Routes[keyof Routes]['href']
  label: ReactNode
}

export const NavItem = ({ href, label }: NavItemProps) => {
  return (
    <NavigationMenuItem>
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          {label}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  )
}

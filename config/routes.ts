export type Routes = typeof routes

export const routes = {
  home: {
    name: 'home',
    href: '/',
  },
  auth: {
    name: 'auth',
    href: '/auth',
  },
  dashboard: {
    name: 'dashboard',
    href: '/dashboard',
  },
  overview: {
    name: 'Overview',
    href: '/dashboard/overview',
  },
  transactions: {
    name: 'Transactions',
    href: '/dashboard/transactions',
  },
  accounts: {
    name: 'Accounts',
    href: '/dashboard/accounts',
  },
  settings: {
    name: 'Settings',
    href: '/dashboard/settings',
  },
}

import { colors } from '@/config/colors'
import { Color } from '@/lib/types/enums.types'

interface ColorDotProps {
  color: Color
  size: 'sm' | 'lg'
  type: 'account' | 'category'
  className?: string
}

export const ColorDot = ({ color, type, size, className }: ColorDotProps) => {
  return (
    <div
      className={`${
        size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-4 h-4' : ''
      } rounded-full ${colors[color][type]} ${className}`}
    />
  )
}

// Copied from config/colors.ts
// Used to trick Tailwind into generating the classes
//
// export const colors = {
//   slate: { account: 'bg-slate-300', category: 'bg-slate-200' },
//   orange: { account: 'bg-orange-300', category: 'bg-orange-200' },
//   lime: { account: 'bg-lime-300', category: 'bg-lime-200' },
//   emerald: { account: 'bg-emerald-300', category: 'bg-emerald-200' },
//   cyan: { account: 'bg-cyan-300', category: 'bg-cyan-200' },
//   blue: { account: 'bg-blue-300', category: 'bg-blue-200' },
//   violet: { account: 'bg-violet-300', category: 'bg-violet-200' },
//   fuchsia: { account: 'bg-fuchsia-300', category: 'bg-fuchsia-200' },
//   rose: { account: 'bg-rose-300', category: 'bg-rose-200' },
// }

import { colors } from '@/config/colors'
import { Color } from '@/lib/types/enums.types'

interface ColorDotProps {
  color: Color
  className?: string
}

export const ColorDot = ({ color, className }: ColorDotProps) => {
  return (
    <div className={`w-4 h-4 rounded-full ${colors[color]} ${className}`} />
  )
}

// Copied from config/colors.ts
// Used to trick Tailwind into generating the classes
//
// export const colors = {
//   slate: 'bg-slate-300',
//   orange: 'bg-orange-300',
//   lime: 'bg-lime-300',
//   emerald: 'bg-emerald-300',
//   cyan: 'bg-cyan-300',
//   blue: 'bg-blue-300',
//   violet: 'bg-violet-300',
//   fuchsia: 'bg-fuchsia-300',
//   rose: 'bg-rose-300',
// }

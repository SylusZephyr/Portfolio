import { Text } from '@react-three/drei'
import { useStore } from '../store.js'

/**
 * troika (what drei's <Text> uses) ships a Latin-only default font, so Chinese
 * renders as empty boxes unless a CJK face is supplied. `public/fonts` holds a
 * subset built from exactly the characters the Chinese content uses — 170kB
 * rather than the 10MB full face — and it is only fetched in Chinese.
 */
export const CJK_FONT = `${import.meta.env.BASE_URL}fonts/noto-sans-sc-subset.ttf`

export function useTextFont() {
  const lang = useStore((s) => s.lang)
  return lang === 'zh' ? CJK_FONT : undefined
}

/** Drop-in for drei's <Text> that picks the right face for the active language. */
export function Txt({ children, ...props }) {
  const font = useTextFont()
  return (
    <Text font={font} {...props}>
      {children}
    </Text>
  )
}

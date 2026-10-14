import type { Metadata, Viewport } from 'next'
import { Sora, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/i18n'

const display = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-face',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Wajid Kanwar Abdul 万吉 — AI Full-Stack Engineer',
  description:
    'AI full-stack engineer building the whole chain that carries a model to the user: edge AI, large-model applications, and the governance that lets them ship. Nanchang University, class of 2027.',
  keywords: [
    'AI full-stack engineer',
    'edge AI',
    'large model applications',
    'ESP32-S3',
    'Vue 3',
    'AI governance',
    'Nanchang University',
    '2027 campus recruitment',
  ],
  authors: [{ name: 'Wajid Kanwar Abdul' }],
  openGraph: {
    title: 'Wajid Kanwar Abdul 万吉 — AI Full-Stack Engineer',
    description:
      'Edge AI, large-model applications and AI governance. Four shipped projects, two national awards, two working languages.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#05060f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body className="antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}

import { Nav } from '@/components/ui/Nav'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Work } from '@/components/sections/Work'
import { Experience } from '@/components/sections/Experience'
import { Skills } from '@/components/sections/Skills'
import { Awards } from '@/components/sections/Awards'
import { Contact } from '@/components/sections/Contact'
import { ScrollProgress } from '@/components/ui/ScrollProgress'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main className="relative mx-auto w-full overflow-clip">
        <Hero />
        <About />
        <Work />
        <Experience />
        <Skills />
        <Awards />
        <Contact />
      </main>
    </>
  )
}

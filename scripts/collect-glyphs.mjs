/**
 * Collects every character used by the Chinese content so the CJK font can be
 * subset down from 10MB to something a visitor will actually wait for.
 * Run via `npm run font:subset`.
 */
import { writeFileSync } from 'node:fs'
import { content } from '../src/data/portfolio.js'

const chars = new Set()
const walk = (v) => {
  if (typeof v === 'string') for (const ch of v) chars.add(ch)
  else if (typeof v === 'function') walk(v('占位'))
  else if (Array.isArray(v)) v.forEach(walk)
  else if (v && typeof v === 'object') Object.values(v).forEach(walk)
}
walk(content.zh)
// keep the Latin/digit/punctuation range too: Chinese copy is full of it
for (let c = 0x20; c <= 0x7e; c++) chars.add(String.fromCharCode(c))
for (const ch of '·—–…‘’“”、。《》〈〉（）【】％°↗↓↑←→') chars.add(ch)

const text = [...chars].sort().join('')
writeFileSync(new URL('../.cjk-glyphs.txt', import.meta.url), text, 'utf8')
console.log(`${chars.size} unique characters`)

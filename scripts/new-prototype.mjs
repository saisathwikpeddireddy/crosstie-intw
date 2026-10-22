// Usage: npm run new <slug> ["Title"]
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'

const slug = process.argv[2]
if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
  console.error('Usage: npm run new <slug> ["Title"]   (slug: lowercase, digits, dashes)')
  process.exit(1)
}
const title = process.argv[3] ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
const dir = `src/prototypes/${slug}`
if (existsSync(dir)) {
  console.error(`${dir} already exists`)
  process.exit(1)
}
mkdirSync(dir, { recursive: true })
writeFileSync(
  `${dir}/index.tsx`,
  `import type { PrototypeMeta } from '../../registry'

export const meta: PrototypeMeta = {
  title: ${JSON.stringify(title)},
  description: '',
}

export default function Prototype() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">${title}</h1>
    </div>
  )
}
`,
)
console.log(`Created ${dir}/index.tsx  ->  open http://localhost:5173/#/${slug}`)

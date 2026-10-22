import type { ComponentType } from 'react'

// Every folder in src/prototypes/<slug>/ with an index.tsx that exports
// `meta` and a default component is picked up automatically.
export type PrototypeMeta = {
  title: string
  description?: string
  order?: number
}

type Module = { default: ComponentType; meta?: PrototypeMeta }

const modules = import.meta.glob<Module>('./prototypes/*/index.tsx', { eager: true })

export type Prototype = { slug: string; meta: PrototypeMeta; Component: ComponentType }

export const prototypes: Prototype[] = Object.entries(modules)
  .map(([path, mod]) => {
    const slug = path.split('/')[2]
    return { slug, meta: mod.meta ?? { title: slug }, Component: mod.default }
  })
  .filter((p) => !p.slug.startsWith('_') || import.meta.env.DEV)
  .sort((a, b) => (a.meta.order ?? 99) - (b.meta.order ?? 99) || a.slug.localeCompare(b.slug))

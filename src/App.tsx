import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { prototypes } from './registry'

// Hash routing (#/slug) so every prototype works on static hosting with no config.
function useRoute() {
  const read = () => window.location.hash.replace(/^#\/?/, '')
  const [route, setRoute] = useState(read)
  useEffect(() => {
    const onChange = () => setRoute(read())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

export default function App() {
  const route = useRoute()
  const active = prototypes.find((p) => p.slug === route)

  if (active) {
    const { Component } = active
    return (
      <>
        <a
          href="#/"
          className="fixed bottom-4 left-4 z-50 flex items-center gap-1 rounded-full bg-zinc-900/80 px-3 py-1.5 text-xs text-white backdrop-blur hover:bg-zinc-900"
        >
          <ArrowLeft size={14} /> All prototypes
        </a>
        <Component />
      </>
    )
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">Crosstie</p>
      <h1 className="mt-1 text-4xl font-semibold tracking-tight">Prototypes</h1>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {prototypes.map((p) => (
          <a
            key={p.slug}
            href={`#/${p.slug}`}
            className="group rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-400 hover:shadow"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-medium">{p.meta.title}</h2>
              <ArrowRight size={16} className="text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-zinc-900" />
            </div>
            {p.meta.description && <p className="mt-1 text-sm text-zinc-500">{p.meta.description}</p>}
          </a>
        ))}
        {prototypes.length === 0 && (
          <p className="text-zinc-500">No prototypes yet. Run <code>npm run new my-idea</code>.</p>
        )}
      </div>
    </main>
  )
}

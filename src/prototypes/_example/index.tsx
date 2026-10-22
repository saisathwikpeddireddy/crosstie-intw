import { useState } from 'react'
import type { PrototypeMeta } from '../../registry'

// Folders starting with "_" only show up in dev. Copy this one to start fast.
export const meta: PrototypeMeta = {
  title: 'Example',
  description: 'Template prototype. Hidden in production builds.',
}

export default function Example() {
  const [count, setCount] = useState(0)
  return (
    <div className="flex min-h-screen items-center justify-center">
      <button
        onClick={() => setCount((c) => c + 1)}
        className="rounded-lg bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-700"
      >
        Clicked {count} times
      </button>
    </div>
  )
}

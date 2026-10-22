// Packs dist/ into .vercel-bundle.json: the `files` array for a Vercel
// create_deployment call (prebuilt static output, so Vercel skips the build).
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'

const TEXT = /\.(html|js|mjs|css|json|svg|txt|map|webmanifest)$/
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]))

const files = walk('dist').map((p) => {
  const text = TEXT.test(p)
  return {
    file: relative('dist', p),
    data: readFileSync(p, text ? 'utf8' : 'base64'),
    encoding: text ? 'utf-8' : 'base64',
  }
})
files.push({ file: 'vercel.json', data: readFileSync('vercel.json', 'utf8'), encoding: 'utf-8' })
writeFileSync('.vercel-bundle.json', JSON.stringify(files))
const kb = Math.round(files.reduce((n, f) => n + f.data.length, 0) / 1024)
console.log(`.vercel-bundle.json: ${files.length} files, ${kb} KB`)

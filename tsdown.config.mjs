const id = '@anionex/dsh-eye-care'
import { readFile } from 'node:fs/promises'
import { basename, dirname, resolve } from 'node:path'
import { transform } from 'lightningcss'

const platformModules = [
  'react',
  'react/jsx-runtime',
  'react-dom',
  'react-dom/client',
  'cordis',
  '@deepseek-ai/dsh-client-ui-slots',
]
const cssPrefix = '\0dsh-eye-care-css:'
const cssSuffix = '.mjs'

export default {
  entry: { client: 'src/client/index.tsx' },
  outDir: 'lib',
  format: 'cjs',
  platform: 'browser',
  target: 'es2022',
  define: { 'process.env.NODE_ENV': '"production"', 'import.meta.env.MODE': '"production"' },
  dts: false,
  sourcemap: true,
  clean: false,
  deps: {
    neverBundle: platformModules,
    alwaysBundle: dependency => platformModules.includes(dependency) ? undefined : true,
    onlyBundle: false,
  },
  plugins: [{
    name: 'dsh-eye-care-css-modules',
    resolveId(source, importer) {
      if (!source.endsWith('.module.css')) return null
      const path = importer === undefined ? source : resolve(dirname(importer), source)
      return cssPrefix + path + cssSuffix
    },
    async load(virtualId) {
      if (!virtualId.startsWith(cssPrefix)) return null
      const path = virtualId.slice(cssPrefix.length, -cssSuffix.length)
      this.addWatchFile(path)
      const source = await readFile(path)
      const result = transform({
        filename: path,
        code: source,
        cssModules: { pattern: '[hash]_[local]' },
        minify: true,
      })
      const classes = {}
      for (const [local, entry] of Object.entries(result.exports ?? {})) classes[local] = entry.name
      const tagId = `${id}/${basename(path)}`
      return [
        `const css = ${JSON.stringify(result.code.toString())};`,
        `const tagId = ${JSON.stringify(tagId)};`,
        'if (typeof document !== "undefined" && document.querySelector(`style[data-plugin-css=${JSON.stringify(tagId)}]`) === null) {',
        '  const tag = document.createElement("style");',
        `  tag.dataset.plugin = ${JSON.stringify(id)};`,
        '  tag.dataset.pluginCss = tagId;',
        '  tag.textContent = css;',
        '  document.head.appendChild(tag);',
        '}',
        `export default ${JSON.stringify(classes)};`,
      ].join('\n')
    },
  }],
  outputOptions: {
    entryFileNames: 'client.js',
    banner: `window.__ModuleLoader__.load({ id: ${JSON.stringify(id)}, factory: (require) => {`,
    footer: 'return module.exports; } });',
    intro: 'var module = { exports: {} }; var exports = module.exports;',
  },
}

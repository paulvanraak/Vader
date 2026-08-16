import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { askApiPlugin } from './server/vitePlugin.ts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), askApiPlugin()],
  define: {
    // Het dev-paneel mag niet alleen onzichtbaar zijn in productie, het mag er
    // niet in zítten. Daarom een echte define en niet import.meta.env: een
    // define wordt vóór het bundelen vervangen door de letterlijke waarde
    // false, waarna de bundelaar de hele tak en de DevPanel-module weggooit.
    // import.meta.env.VITE_DEV_TOOLS zou alleen wegvallen als de variabele
    // toevallig gezet is; ontbreekt hij, dan blijft de code in de bundel staan.
    // Het bouwslot in scripts/generate-api.mjs vangt de omgekeerde fout af.
    __DEV_TOOLS__: JSON.stringify(mode !== 'production' || process.env.VITE_DEV_TOOLS === 'true'),
  },
}))

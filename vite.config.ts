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
    // Preview-deploys krijgen het gereedschap vanzelf: dat is precies waar je
    // wil rondklikken, en je hoeft er geen omgevingsvariabele voor te zetten.
    // Productie valt hier nooit onder, en het bouwslot in prebuild vangt af
    // dat iemand de vlag alsnog op productie aanzet.
    __DEV_TOOLS__: JSON.stringify(
      mode !== 'production' ||
        process.env.VERCEL_ENV === 'preview' ||
        process.env.VITE_DEV_TOOLS === 'true',
    ),
    // Aparte vlag voor alleen de overslaan-knop op het inlogscherm.
    //
    // Bewust niet dezelfde vlag als hierboven. Het dev-paneel kan voortgang
    // wissen en tussen profielen springen; dat hoort nooit op productie en het
    // bouwslot bewaakt dat. De overslaan-knop levert alleen een gewone sessie
    // op onder RLS, dus die mag daar wel staan als je hem bewust aanzet.
    __ALLOW_SKIP_LOGIN__: JSON.stringify(
      mode !== 'production' ||
        process.env.VERCEL_ENV === 'preview' ||
        process.env.VITE_DEV_TOOLS === 'true' ||
        process.env.VITE_ALLOW_SKIP_LOGIN === 'true',
    ),
  },
}))

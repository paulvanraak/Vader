import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { worlds } from '../src/data/worlds'
import { lessons } from '../src/data/lessons'
import { compassEntries } from '../src/data/compass'
import { worldStyles } from '../src/lib/worldStyles'

const url = process.env.VITE_SUPABASE_URL
const key = process.env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
  throw new Error('VITE_SUPABASE_URL en VITE_SUPABASE_ANON_KEY moeten gezet zijn in .env')
}

const supabase = createClient(url, key)

interface Specialist {
  name: string
  role: string
  bio: string
}

const specialisten: Specialist[] = [
  {
    name: 'Dia Jonas Dreessen',
    role: 'Klinisch psycholoog',
    bio: 'Gespecialiseerd in gezinsdynamiek en de overgang van kindertijd naar puberteit.',
  },
  {
    name: 'Drs. Thomas Bakker',
    role: 'Kinderpsycholoog',
    bio: 'Werkt met kinderen van acht tot zestien jaar rond emotieregulatie en zelfvertrouwen.',
  },
  {
    name: 'Dr. Sanne Verhoeven',
    role: 'Gedragswetenschapper',
    bio: 'Onderzoekt hoe puberbreinen reageren op grenzen, groepsdruk en sociale media.',
  },
  {
    name: 'Drs. Youssef El Amrani',
    role: 'Orthopedagoog',
    bio: 'Adviseert ouders over opvoedstijl, communicatie en het versterken van de ouder-kindband.',
  },
]

function colorVarToHex(varRef: string): string {
  // De worldStyles gebruiken CSS var()-referenties (bv. 'var(--color-accent-teal)').
  // Voor de kleurenkolommen in de CMS slaan we vaste hexwaarden op; deze mapping
  // komt overeen met de light-mode waarden in src/index.css.
  const map: Record<string, string> = {
    'var(--color-accent-teal)': '#2fb6a8',
    'var(--color-accent-rose)': '#f0618b',
    'var(--color-accent-amber)': '#e0a02c',
    'var(--color-primary-500)': '#4c6fff',
    'var(--color-accent-violet)': '#8b7ff0',
    'var(--color-accent-orange)': '#ff993a',
  }
  return map[varRef] ?? '#4c6fff'
}

const accentDarkMap: Record<number, string> = {
  1: '#1f8a7f',
  2: '#c73f68',
  3: '#b57a17',
  4: '#1b3690',
  5: '#5f52c9',
  6: '#d9761a',
}

async function main() {
  console.log('Seeding worlds...')
  const worldIdMap = new Map<number, string>()
  for (const world of worlds) {
    const style = worldStyles[world.id]
    const { data, error } = await supabase
      .from('worlds')
      .insert({
        title: world.title,
        subtitle: world.subtitle,
        color_accent: colorVarToHex(style.accentVar),
        color_accent_dark: accentDarkMap[world.id] ?? '#1b3690',
        color_dark: style.dark,
        sort_order: world.id,
      })
      .select('id')
      .single()
    if (error) throw error
    worldIdMap.set(world.id, data.id)
  }
  console.log(`  -> ${worldIdMap.size} worlds`)

  console.log('Seeding compass entries...')
  for (const entry of compassEntries) {
    const worldId = worldIdMap.get(entry.worldId)
    if (!worldId) continue
    const { error } = await supabase
      .from('compass_entries')
      .insert({ world_id: worldId, background: entry.background })
    if (error) throw error
  }
  console.log(`  -> ${compassEntries.length} compass entries`)

  console.log('Seeding lessons + beats...')
  const worldSortCounters = new Map<number, number>()
  let lessonCount = 0
  let beatCount = 0
  let optieCount = 0
  let actieCount = 0

  for (const lesson of lessons) {
    const worldId = worldIdMap.get(lesson.world)
    if (!worldId) continue
    const sortOrder = worldSortCounters.get(lesson.world) ?? 0
    worldSortCounters.set(lesson.world, sortOrder + 1)

    const { data: lessonRow, error: lessonError } = await supabase
      .from('lessons')
      .insert({
        world_id: worldId,
        cohort: lesson.cohort,
        title: lesson.title,
        sort_order: sortOrder,
      })
      .select('id')
      .single()
    if (lessonError) throw lessonError
    lessonCount += 1

    const beatRows = lesson.beats.map((beat, index) => ({
      lesson_id: lessonRow.id,
      type: beat.type,
      sort_order: index,
      body: beat.body ?? null,
      fout: beat.fout ?? null,
      beter: beat.beter ?? null,
      vraag: beat.vraag ?? null,
    }))
    const { data: insertedBeats, error: beatsError } = await supabase
      .from('beats')
      .insert(beatRows)
      .select('id')
    if (beatsError) throw beatsError
    beatCount += insertedBeats.length

    for (let i = 0; i < lesson.beats.length; i++) {
      const beat = lesson.beats[i]
      const beatId = insertedBeats[i].id

      if (beat.type === 'oefening' && beat.opties) {
        const optieRows = beat.opties.map((optie, index) => ({
          beat_id: beatId,
          label: optie.label,
          correct: optie.correct,
          feedback: optie.feedback,
          sort_order: index,
        }))
        const { error } = await supabase.from('oefening_opties').insert(optieRows)
        if (error) throw error
        optieCount += optieRows.length
      }

      if (beat.type === 'thuismissie' && beat.acties) {
        const actieRows = beat.acties.map((actie, index) => ({
          beat_id: beatId,
          actie,
          sort_order: index,
        }))
        const { error } = await supabase.from('thuismissie_acties').insert(actieRows)
        if (error) throw error
        actieCount += actieRows.length
      }
    }
  }
  console.log(`  -> ${lessonCount} lessons, ${beatCount} beats, ${optieCount} opties, ${actieCount} acties`)

  console.log('Seeding specialists...')
  const specialistRows = specialisten.map((s, index) => ({ ...s, sort_order: index }))
  const { error: specialistError } = await supabase.from('specialists').insert(specialistRows)
  if (specialistError) throw specialistError
  console.log(`  -> ${specialistRows.length} specialists`)

  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

import { randomUUID } from 'node:crypto'
import { writeFileSync } from 'node:fs'
import { worlds } from '../src/data/worlds'
import { lessons } from '../src/data/lessons'
import { compassEntries } from '../src/data/compass'
import { worldStyles } from '../src/lib/worldStyles'

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

function sqlStr(value: string | null | undefined): string {
  if (value === null || value === undefined) return 'null'
  return `'${value.replace(/'/g, "''")}'`
}

function sqlBool(value: boolean): string {
  return value ? 'true' : 'false'
}

const lines: string[] = []
lines.push('begin;')

const worldIdMap = new Map<number, string>()
for (const world of worlds) {
  const id = randomUUID()
  worldIdMap.set(world.id, id)
  const style = worldStyles[world.id]
  lines.push(
    `insert into worlds (id, title, subtitle, color_accent, color_accent_dark, color_dark, sort_order) values (${sqlStr(id)}, ${sqlStr(world.title)}, ${sqlStr(world.subtitle)}, ${sqlStr(colorVarToHex(style.accentVar))}, ${sqlStr(accentDarkMap[world.id] ?? '#1b3690')}, ${sqlStr(style.dark)}, ${world.id});`,
  )
}

for (const entry of compassEntries) {
  const worldId = worldIdMap.get(entry.worldId)
  if (!worldId) continue
  lines.push(`insert into compass_entries (world_id, background) values (${sqlStr(worldId)}, ${sqlStr(entry.background)});`)
}

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

  const lessonId = randomUUID()
  lines.push(
    `insert into lessons (id, world_id, cohort, title, sort_order) values (${sqlStr(lessonId)}, ${sqlStr(worldId)}, ${sqlStr(lesson.cohort)}, ${sqlStr(lesson.title)}, ${sortOrder});`,
  )
  lessonCount += 1

  lesson.beats.forEach((beat, index) => {
    const beatId = randomUUID()
    lines.push(
      `insert into beats (id, lesson_id, type, sort_order, body, fout, beter, vraag) values (${sqlStr(beatId)}, ${sqlStr(lessonId)}, ${sqlStr(beat.type)}, ${index}, ${sqlStr(beat.body)}, ${sqlStr(beat.fout)}, ${sqlStr(beat.beter)}, ${sqlStr(beat.vraag)});`,
    )
    beatCount += 1

    if (beat.type === 'oefening' && beat.opties) {
      beat.opties.forEach((optie, optieIndex) => {
        lines.push(
          `insert into oefening_opties (beat_id, label, correct, feedback, sort_order) values (${sqlStr(beatId)}, ${sqlStr(optie.label)}, ${sqlBool(optie.correct)}, ${sqlStr(optie.feedback)}, ${optieIndex});`,
        )
        optieCount += 1
      })
    }

    if (beat.type === 'thuismissie' && beat.acties) {
      beat.acties.forEach((actie, actieIndex) => {
        lines.push(
          `insert into thuismissie_acties (beat_id, actie, sort_order) values (${sqlStr(beatId)}, ${sqlStr(actie)}, ${actieIndex});`,
        )
        actieCount += 1
      })
    }
  })
}

specialisten.forEach((s, index) => {
  lines.push(
    `insert into specialists (name, role, bio, sort_order) values (${sqlStr(s.name)}, ${sqlStr(s.role)}, ${sqlStr(s.bio)}, ${index});`,
  )
})

lines.push('commit;')

const outPath = '/tmp/claude-0/-home-user-Vader/51aeca2e-e2f8-59a9-ab68-337a3761767c/scratchpad/seed-cms.sql'
writeFileSync(outPath, lines.join('\n') + '\n', 'utf-8')

console.log(`wrote ${outPath}`)
console.log(`worlds=${worldIdMap.size} lessons=${lessonCount} beats=${beatCount} opties=${optieCount} acties=${actieCount} specialisten=${specialisten.length}`)

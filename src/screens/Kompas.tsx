import { Compass } from 'lucide-react'
import { Card } from '../components/Card'

const richtingen = [
  'Je zoon is niet het probleem.',
  'Kleine, oprechte gesprekken werken beter dan grote speeches.',
  'Wat jij laat zien, telt zwaarder dan wat je zegt.',
]

export function Kompas() {
  return (
    <div className="flex flex-col gap-5 px-5 py-6">
      <div>
        <p className="text-label text-neutral-300">Kompas</p>
        <h1 className="text-h2 text-neutral-900">Waar je op koerst</h1>
      </div>

      <Card className="flex flex-col gap-2 bg-primary-500/10 shadow-none ring-0">
        <Compass size={22} className="text-primary-600" strokeWidth={2} />
        <p className="text-body text-neutral-900">
          Geen vaste route, wel een richting. Dit zijn de gedachten om op terug te vallen.
        </p>
      </Card>

      <div className="flex flex-col gap-3">
        {richtingen.map((tekst) => (
          <Card key={tekst}>
            <p className="text-body-lg text-neutral-900">{tekst}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

import { ChildSwitcher } from '../components/ChildSwitcher'
import { FeatureExplainer } from '../components/FeatureExplainer'
import { ThemaMissies } from '../components/ThemaMissies'
import { laadRitme } from '../lib/ritme'
import { THEMAS } from '../content/themas'

/**
 * De checklist. Hier staan de opdrachten die je uit de thema's meekrijgt, en
 * hier vertel je hoe het ging — op het moment dat je het echt gedaan hebt.
 *
 * De acties uit het oude pad staan hier niet meer: dat pad bestaat niet meer,
 * dus die opdrachten verwezen naar lessen die nergens meer te bereiken waren.
 */
export function ProbeerDitEens() {
  const ritme = laadRitme()
  const aantal = THEMAS.flatMap((t) => t.lessen).filter((l) => ritme.missies[l.id]).length

  return (
    <div className="flex flex-col">
      <ChildSwitcher />
      <div className="flex flex-col gap-5 px-5 pb-6 pt-4">
        <div>
          <h1 className="font-serif text-h2 font-semibold text-ink">Jouw checklist</h1>
          <p className="mt-1 text-caption text-ink-muted">
            {aantal === 0
              ? 'Nog niks te doen'
              : `${aantal} ${aantal === 1 ? 'opdracht' : 'opdrachten'} uit je thema`}
          </p>
        </div>

        {aantal === 0 ? (
          <p className="text-body text-ink-muted">
            Zodra je een deel van een thema afrondt, komt de opdracht hier te staan. Daar vertel je
            dan ook hoe het ging.
          </p>
        ) : (
          <ThemaMissies />
        )}
      </div>
      <FeatureExplainer id="checklist" />
    </div>
  )
}

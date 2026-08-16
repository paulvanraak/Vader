import { supabase } from './supabaseClient'
import { updateChildProgress } from './account'

/**
 * Zet de voortgang van één kind terug op nul. Gaat via de gewone client, dus
 * onder RLS: je kunt hiermee nooit iets wissen dat niet van je eigen account is.
 *
 * Bewust alleen voortgang. Het kind zelf blijft bestaan, want anders raak je
 * bij elke testronde je testprofiel kwijt en moet je de onboarding opnieuw door.
 */
export async function resetProgressForChild(childId: string): Promise<void> {
  await updateChildProgress(childId, {
    completed_lesson_ids: [],
    done_action_ids: [],
    streak_days: 0,
  })

  for (const table of ['path_items', 'action_completions', 'earned_badges'] as const) {
    const { error } = await supabase.from(table).delete().eq('child_id', childId)
    if (error) throw error
  }
}

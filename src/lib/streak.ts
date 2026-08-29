function startOfWeek(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const day = d.getDay() // 0 = zondag .. 6 = zaterdag
  const diffToMonday = (day === 0 ? -6 : 1) - day
  d.setDate(d.getDate() + diffToMonday)
  return d
}

function weekKey(date: Date): string {
  return startOfWeek(date).toISOString().slice(0, 10)
}

// Connectie-streak: aantal aaneengesloten weken met minstens één echte actie.
// De huidige week telt pas mee zodra er iets in zit, maar breekt de streak
// nog niet als hij nog leeg is — de week is immers nog niet voorbij.
export function computeConnectionStreakWeeks(completedAtDates: string[], today: Date = new Date()): number {
  const weeksWithActivity = new Set(completedAtDates.map((iso) => weekKey(new Date(iso))))

  let cursor = startOfWeek(today)
  let streak = 0

  if (weeksWithActivity.has(weekKey(cursor))) {
    streak = 1
  }
  cursor = new Date(cursor)
  cursor.setDate(cursor.getDate() - 7)

  while (weeksWithActivity.has(weekKey(cursor))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 7)
  }

  return streak
}

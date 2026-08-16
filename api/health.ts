// Minimale diagnostische route zonder enige import, om te bevestigen dat
// Vercel serverless functions voor dit project uberhaupt correct draaien,
// los van wat er mis is in api/ask.ts.
export default function handler(req: any, res: any) {
  res.status(200).json({ ok: true, node: process.version })
}

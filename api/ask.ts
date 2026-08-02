import { handleAsk, sanitizeMessages } from '../server/askHandler.ts'

/**
 * Serverless-functieversie van dezelfde routelogica, voor een deploy op een
 * platform als Vercel (waar vite.config.ts se dev-middleware niet draait).
 */
export default async function handler(req: any, res: any) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ type: 'error', text: 'Method not allowed' })
      return
    }
    const messages = sanitizeMessages(req.body?.messages)
    const result = await handleAsk(messages)
    res.status(200).json(result)
  } catch (err) {
    // Vangt ook fouten op die buiten handleAsk's eigen try/catch vallen
    // (bijvoorbeeld een importfout die pas bij de eerste aanroep zichtbaar wordt),
    // zodat de client altijd leesbare JSON terugkrijgt in plaats van een crashpagina.
    res.status(500).json({
      type: 'error',
      text: 'Serverfout in /api/ask.',
      detail: err instanceof Error ? err.message : String(err),
    })
  }
}

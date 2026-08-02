import { handleAsk, sanitizeMessages } from '../server/askHandler.ts'

/**
 * Serverless-functieversie van dezelfde routelogica, voor een deploy op een
 * platform als Vercel (waar vite.config.ts se dev-middleware niet draait).
 */
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ type: 'error', text: 'Method not allowed' })
    return
  }
  const messages = sanitizeMessages(req.body?.messages)
  const result = await handleAsk(messages)
  res.status(200).json(result)
}

import { handleAsk } from '../server/askHandler.ts'

/**
 * Serverless-functieversie van dezelfde routelogica, voor een deploy op een
 * platform als Vercel (waar vite.config.ts se dev-middleware niet draait).
 */
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ type: 'error', text: 'Method not allowed' })
    return
  }
  const question = typeof req.body?.question === 'string' ? req.body.question : ''
  const result = await handleAsk(question)
  res.status(200).json(result)
}

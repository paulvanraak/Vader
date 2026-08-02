import type { Plugin } from 'vite'
import dotenv from 'dotenv'
import { handleAsk, sanitizeMessages } from './askHandler.ts'

dotenv.config()

/**
 * Kleine dev-serverroute voor "Vraag het". De client praat nooit rechtstreeks
 * met de Claude-API; de sleutel leeft alleen hier, server-side.
 */
export function askApiPlugin(): Plugin {
  return {
    name: 'vader-ask-api',
    configureServer(server) {
      server.middlewares.use('/api/ask', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end('Method not allowed')
          return
        }
        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })
        req.on('end', () => {
          void (async () => {
            res.setHeader('Content-Type', 'application/json')
            try {
              const parsed = JSON.parse(body || '{}') as { messages?: unknown }
              const messages = sanitizeMessages(parsed.messages)
              const result = await handleAsk(messages)
              res.end(JSON.stringify(result))
            } catch {
              res.statusCode = 400
              res.end(JSON.stringify({ type: 'error', text: 'Ongeldige aanvraag.' }))
            }
          })()
        })
      })
    },
  }
}

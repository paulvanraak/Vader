import Anthropic from '@anthropic-ai/sdk'

export default function handler(req: any, res: any) {
  res.status(200).json({ ok: true, loaded: typeof Anthropic })
}

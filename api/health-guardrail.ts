import { triggersGuardrail } from '../src/lib/guardrail.ts'

export default function handler(req: any, res: any) {
  res.status(200).json({ ok: true, loaded: typeof triggersGuardrail })
}

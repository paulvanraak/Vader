import { useEffect, useMemo, useRef } from 'react'
import { hapticTick } from '../lib/haptics'

const ITEM_HEIGHT = 32
const VISIBLE_HEIGHT = ITEM_HEIGHT * 3
const PAD = (VISIBLE_HEIGHT - ITEM_HEIGHT) / 2

const MONTHS = [
  'jan',
  'feb',
  'mrt',
  'apr',
  'mei',
  'jun',
  'jul',
  'aug',
  'sep',
  'okt',
  'nov',
  'dec',
]

interface WheelDatePickerProps {
  value: string // yyyy-mm-dd
  onChange: (value: string) => void
  min: string // yyyy-mm-dd
  max: string // yyyy-mm-dd
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

function clamp(iso: string, min: string, max: string): string {
  if (iso < min) return min
  if (iso > max) return max
  return iso
}

export function WheelDatePicker({ value, onChange, min, max }: WheelDatePickerProps) {
  const [minYear] = min.split('-').map(Number)
  const [maxYear] = max.split('-').map(Number)
  const [y, m, d] = value.split('-').map(Number)

  const years = useMemo(() => {
    const arr: number[] = []
    for (let year = maxYear; year >= minYear; year--) arr.push(year)
    return arr
  }, [minYear, maxYear])

  const maxDay = daysInMonth(y, m)
  const days = useMemo(() => Array.from({ length: maxDay }, (_, i) => i + 1), [maxDay])

  function set(next: { day?: number; month?: number; year?: number }) {
    const nextYear = next.year ?? y
    const nextMonth = next.month ?? m
    const cappedDay = Math.min(next.day ?? d, daysInMonth(nextYear, nextMonth))
    const iso = `${nextYear}-${String(nextMonth).padStart(2, '0')}-${String(cappedDay).padStart(2, '0')}`
    onChange(clamp(iso, min, max))
  }

  return (
    <div className="relative flex" style={{ height: VISIBLE_HEIGHT }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 rounded-md bg-surface-sunken"
        style={{ height: ITEM_HEIGHT }}
      />
      <WheelColumn items={days} value={d} onChange={(day) => set({ day })} format={(v) => String(v)} />
      <WheelColumn
        items={Array.from({ length: 12 }, (_, i) => i + 1)}
        value={m}
        onChange={(month) => set({ month })}
        format={(v) => MONTHS[v - 1]}
        grow
      />
      <WheelColumn items={years} value={y} onChange={(year) => set({ year })} format={(v) => String(v)} />
    </div>
  )
}

interface WheelColumnProps {
  items: number[]
  value: number
  onChange: (value: number) => void
  format: (value: number) => string
  grow?: boolean
}

function WheelColumn({ items, value, onChange, format, grow }: WheelColumnProps) {
  const ref = useRef<HTMLDivElement>(null)
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const suppressUntil = useRef(0)

  // Houdt de scrollpositie in sync met de externe waarde (bv. wanneer de
  // dag-kolom moet corrigeren omdat de gekozen maand korter is).
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const index = items.indexOf(value)
    if (index < 0) return
    const targetTop = index * ITEM_HEIGHT
    if (Math.abs(el.scrollTop - targetTop) > 1) {
      suppressUntil.current = Date.now() + 300
      el.scrollTo({ top: targetTop, behavior: 'auto' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, items.length])

  function handleScroll() {
    if (Date.now() < suppressUntil.current) return
    if (settleTimer.current) clearTimeout(settleTimer.current)
    settleTimer.current = setTimeout(() => {
      const el = ref.current
      if (!el) return
      const index = Math.min(items.length - 1, Math.max(0, Math.round(el.scrollTop / ITEM_HEIGHT)))
      const next = items[index]
      if (next !== undefined && next !== value) {
        hapticTick()
        onChange(next)
      }
      const targetTop = index * ITEM_HEIGHT
      if (Math.abs(el.scrollTop - targetTop) > 1) {
        el.scrollTo({ top: targetTop, behavior: 'smooth' })
      }
    }, 100)
  }

  return (
    <div
      ref={ref}
      onScroll={handleScroll}
      className={`snap-y snap-mandatory overflow-y-scroll scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
        grow ? 'flex-[1.2]' : 'flex-1'
      }`}
      style={{ paddingTop: PAD, paddingBottom: PAD }}
    >
      {items.map((item) => (
        <div
          key={item}
          className={`flex snap-center items-center justify-center text-body-lg ${
            item === value ? 'font-bold text-ink' : 'text-ink-faint'
          }`}
          style={{ height: ITEM_HEIGHT }}
        >
          {format(item)}
        </div>
      ))}
    </div>
  )
}

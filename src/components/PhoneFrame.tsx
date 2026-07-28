import type { ReactNode } from 'react'

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full w-full items-center justify-center bg-neutral-100 py-8">
      <div className="w-full max-w-[390px] overflow-hidden rounded-5xl bg-neutral-900 p-3 shadow-2xl">
        <div className="flex h-[780px] flex-col overflow-hidden rounded-4xl bg-neutral-page">
          <div className="flex h-11 shrink-0 items-center justify-center">
            <div className="h-1.5 w-24 rounded-full bg-neutral-900/80" />
          </div>
          <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
        </div>
      </div>
    </div>
  )
}

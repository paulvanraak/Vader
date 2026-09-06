import type { ReactNode } from 'react'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh w-full justify-center bg-surface-sunken">
      <div className="relative flex h-dvh w-full max-w-[480px] flex-col overflow-hidden bg-page shadow-xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage: 'var(--page-bg-image)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="relative z-10 flex h-full flex-col overflow-hidden">{children}</div>
      </div>
    </div>
  )
}

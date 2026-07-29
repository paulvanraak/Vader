import type { ReactNode } from 'react'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh w-full justify-center bg-surface-sunken">
      <div
        className="flex h-dvh w-full max-w-[480px] flex-col overflow-hidden bg-page shadow-xl"
        style={{
          backgroundImage: 'var(--page-bg-image)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {children}
      </div>
    </div>
  )
}

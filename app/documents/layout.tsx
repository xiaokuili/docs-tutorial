'use client'

import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function DocumentsLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="text-xl font-semibold">Documents</div>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
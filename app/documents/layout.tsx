'use client'

import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function DocumentsLayout({ children }: LayoutProps) {
  return (


    <main >
      {children}
    </main>
  )
}

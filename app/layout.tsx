import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google'
import {ConvexClientProvider} from "@/components/ConvexClientProvider"
import { Toaster } from 'sonner'
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";
 
const inter = Inter({
  subsets: ['latin'],
})
export const metadata: Metadata = {
  title: "Doc",
  description: "Create Documents Online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={inter.className}>
          <ConvexClientProvider>
            {children}
            <Toaster />
          </ConvexClientProvider>
        </body>
      </html>
  );
}

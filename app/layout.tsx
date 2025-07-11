import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ToastContainer } from "../components/ui/toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TrackSpace - User Tracking & Collaboration Platform",
  description: "Connect, collaborate, and track your productivity with TrackSpace",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}

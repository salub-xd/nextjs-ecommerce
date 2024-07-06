import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ModalProvider from '@/providers/modal-provider'
import ToastProvider from '@/providers/toast-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Salub Store',
  description: 'Salub E-Store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark'>
      <body className={inter.className}>
        <ToastProvider/>
        <ModalProvider />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}

import { Inter } from 'next/font/google'
 
const inter = Inter({ subsets: ['latin'] })
 
export const metadata = {
  title: 'Interview Assessment Tool',
  description: 'Digital Marketing Interview Assessment Tool',
}
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

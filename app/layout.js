
import './globals.css'
import { Kanit } from 'next/font/google'
import Providers from '../redux/Providers'
import axios from 'axios'
axios.defaults.withCredentials = true;

const kanit = Kanit(
  {
      weight: '400',
     subsets: ['latin'] 
    }
  )

export const metadata = {
  title: 'Zleads',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (

    <html lang="en">

      <body className={kanit.className}>
        <Providers>
        {children}
        </Providers>
        
        </body>
    </html>
  )
}

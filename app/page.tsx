import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <a href='/products' className='btn btn-primary'>App</a>
    </div>
  )
}

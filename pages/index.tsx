import Head from 'next/head'
import Image from 'next/image'
import Herosection from '../components/HeroSection/Herosection'
import NFTStep from '../components/NFTStep/NFTStep'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
  <div>
      <Herosection />
      <NFTStep />
  </div>
  )
}

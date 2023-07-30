import Image from 'next/image'
import styles from './page.module.css'
import NotionPageData from '@/lib/notion/pageBuilder'

export default function Home() {
  return (
    <main className={styles.main}>
      <NotionPageData />
    </main>
  )
}

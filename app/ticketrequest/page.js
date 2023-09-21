import Navbar from '../../components/Navbar'
import React from 'react'
import styles from "../../styles/ticketrequest.module.css"
import Sidebar from '../../components/Sidebar'

function Page() {
  return (
    <div className={styles.container}>
  <Sidebar curentPage="ticketrequest"/>
  <div className={styles.home}>
    <Navbar />
<div>
Ticket Page

</div>
  </div>
    </div>
  )
}

export default Page

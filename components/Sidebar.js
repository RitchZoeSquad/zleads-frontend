"use client"
import React from 'react'
import styles from "../styles/sidebar.module.css"
import Image from 'next/image'
import logo from "../public/images/logo.png"

import cube from "../public/icons/cube.png"
import folder from "../public/icons/folder.png"
import logout from "../public/icons/logout.png"
import profile from "../public/icons/profile.png"
import user from "../public/icons/user.png"
import Link from 'next/link'

function Sidebar({curentPage}) {


   const logouthandler =async()=>{

   }
  return (
    <div  className={styles.containerNavbar}>
 <div className={styles.heading}>
    <Image className={styles.logo} src={logo} />
    <h1 className={styles.name}>Zoesquad</h1>
 </div>


 <p className={styles.menu}>Main Menu</p>

 <div className={styles.item}>
    <Image   src={cube} className={styles.logo_item} />
    <Link href="/" style={{color: curentPage==="home" ? "#ED6214": "#757575"}} className={styles.item_name}>Search Leads</Link>
 </div>
 <div className={styles.item}>
    <Image   src={profile} className={styles.logo_item} />
    <Link  href="/verifiedleads"  style={{color: curentPage==="verifiedleads" ? "#ED6214": "#757575"}} className={styles.item_name}>Verified  Leads</Link>
 </div>
 <div className={styles.item}>
    <Image   src={folder} className={styles.logo_item} />
    <Link   href="/riskyleads"  style={{color: curentPage==="riskyleads" ? "#ED6214": "#757575"}} className={styles.item_name}>Risky Leads</Link>
 </div>
 <div className={styles.item}>
    <Image   src={user} className={styles.logo_item} />
    <Link  href="/foundleads"  style={{color: curentPage==="foundleads" ? "#ED6214": "#757575"}}  className={styles.item_name}>Found Leads</Link>
 </div>
 <div className={styles.item}>
    <Image    src={user} className={styles.logo_item} />
    <Link  href="/ticketrequest"   style={{color: curentPage==="ticketrequest" ? "#ED6214": "#757575"}} className={styles.item_name}>Ticket Request</Link>
 </div>
 <div className={styles.item}>
    <Image   src={logout} className={styles.logo_item} />
    <h3 onClick={logouthandler} style={{color:  "#757575"}}  className={styles.item_name}>Logout</h3>
 </div>


    </div>
  )
}

export default Sidebar

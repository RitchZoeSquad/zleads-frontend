"use client"
import React from 'react'
import styles from "../styles/sidebar.module.css"
import Image from 'next/image'

import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setdata, setfoundLeads, setisLoggedin, setriskyLeads } from "../redux/reducers/userSlice.js"
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';
import { setsearched , setfoundResult} from '@/redux/reducers/leadsSlice'
import { setData } from '@/redux/reducers/EmailVerifierSlice'

axios.defaults.withCredentials = true;

   
function Sidebar({curentPage}) {
const users=useSelector((state)=>{return state.users})
const dispatch=useDispatch()

const router=useRouter()
   const logouthandler =async()=>{
      router.push("/")
   
dispatch(setisLoggedin(false))
dispatch(setdata(null))

dispatch(setsearched(''))
dispatch(setfoundResult(null))
dispatch(setriskyLeads(null))
dispatch(setfoundLeads(null))
dispatch(setData(null))

toast.success("Logout Successfully")


await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,null, {withCredentials: true,credentials: 'include'});   
router.push("/login")
   }


  return (
    <div  className={styles.containerNavbar}>
 <div onClick={()=>{router.push("/")}} className={styles.heading}>
    <img  src="https://d3k81nzjgcglm8.cloudfront.net/images/logo.png" width={65} height={65} className={styles.logo}    alt="logo"   />
    <h1 className={styles.name}>Zoesquad</h1>
 </div>


 <p className={styles.menu}>Main Menu</p>

 <div className={styles.item}>
    <img alt="logo"    width={24} height={24}       src="https://d3k81nzjgcglm8.cloudfront.net/icons/cube.png" className={styles.logo_item} />
    <Link href="/" style={{color: curentPage==="home" ? "#ED6214": "#757575"}} className={styles.item_name}>Search Leads</Link>
 </div>

 <div className={styles.item}>
    <img  alt="logo"    width={24} height={24}     src="https://d3k81nzjgcglm8.cloudfront.net/icons/user.png" className={styles.logo_item} />
    <Link  href="/foundleads"  style={{color: curentPage==="foundleads" ? "#ED6214": "#757575"}}  className={styles.item_name}>Found Leads</Link>
 </div>


 <div className={styles.item}>
    <img alt="logo"     width={24} height={24}     src="https://d3k81nzjgcglm8.cloudfront.net/icons/folder.png" className={styles.logo_item} />
    <Link   href="/riskyleads"  style={{color: curentPage==="riskyleads" ? "#ED6214": "#757575"}} className={styles.item_name}>Risky Leads</Link>
 </div>
 <div className={styles.item}>
    <img alt="logo"    width={24} height={24}      src="https://d3k81nzjgcglm8.cloudfront.net/icons/profile.png" className={styles.logo_item} />
    <Link  href="/verifiedleads"   style={{color: curentPage==="verifiedleads" ? "#ED6214": "#757575"}} className={styles.item_name}>Verified Leads</Link>
 </div>
 <div className={styles.item}>
    <img  alt="logo"     width={24} height={24}    src="https://d3k81nzjgcglm8.cloudfront.net/icons/user.png" className={styles.logo_item} />
    <Link  href="/ticketrequest"   style={{color: curentPage==="ticketrequest" ? "#ED6214": "#757575"}} className={styles.item_name}>Ticket Request</Link>
 </div>
 {users.isloggedin?<div className={styles.item}>
    <img  alt="logo"    width={24} height={24}    src="https://d3k81nzjgcglm8.cloudfront.net/icons/logout.png" className={styles.logo_item} />
    <h3 onClick={logouthandler} style={{color:  "#757575"}}  className={styles.item_name}>Logout</h3>
 </div>:null}

 <Toaster position="bottom-center"/>


    </div>
  )
}

export default Sidebar

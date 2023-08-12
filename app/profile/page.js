"use client"
import Navbar from '../../components/Navbar'
import React, { useEffect, useState } from 'react'
import styles from "../../styles/profile.module.css"
import Sidebar from '../../components/Sidebar'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { redirect, useRouter } from 'next/navigation'

function Page() {
  const users=useSelector((state)=>{return state.users})
  const router=useRouter()
const [name,setname]=useState(users?.userdata?.name)
const [profilePicture,setprofilePicture]=useState('')

const [country,setcountry]=useState('')
const [city,setcity]=useState('')
const [Province,setProvince]=useState('')
const [bio,setbio]=useState('')
const [twillioApi,settwillioApi]=useState('')
const [googleApi,setgooglegoogleApi]=useState('')


if(users.isloggedin==false){
  redirect('/login')
}else{

  return (
    <div className={styles.container}>
  <Sidebar />
  <div className={styles.home}>
    <Navbar />

    <div className={styles.details}>
    <div className={styles.hed}>
        <p>User Details</p>
     <Image src="/icons/info.png"  alt="profile_Picture" width={20} height={20}  className={styles.logo}   />
    </div>

  <form className={styles.form}>

    <div className={styles.formItem}>
          <div >Profile Photo </div>
          <label htmlFor="photo">
  {/* <Image src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${users.userdata.profilePhoto}`}  alt="profile_Picture" width={100} height={100}  className={styles.profilePicture}/> */}
  <Image src={"/images/user.png"}  alt="profile_Picture" width={100} height={100}  className={styles.profilePicture}/>
             </label>
        <input hidden value={profilePicture} onChange={(e)=>{setprofilePicture(e.target.value)}}   type="file" id="photo" name="photo" />

        </div>

    <div className={styles.formItem}>
          <label htmlFor="Name">User Name </label>
          <input value={name} onChange={(e)=>{setname(e.target.value)}} className={styles.inp} placeholder='John Doe' type="text" id="Name" name="Name" />
        </div>
  
    <div className={styles.formItem}>
          <label htmlFor="Email">Email </label>
          <input readOnly value={users.userdata.email} className={styles.inp} placeholder='JohnDoe@gmail.com' type="text" id="Email" name="Email" />
        </div>

            <div className={styles.additionalInfo}>
          <div className={styles.formItemA}>
          <label htmlFor="country">Country </label>
          <input  value={country} onChange={(e)=>{setcountry(e.target.value)}} className={styles.inpA} placeholder='Indonesia' type="text" id="country" name="country" />
          </div>

          <div className={styles.formItemA}>
          <label htmlFor="City">City </label>
          <input  value={city} onChange={(e)=>{setcity(e.target.value)}} className={styles.inpA} placeholder='Semarang' type="text" id="City" name="City" />
          </div>

          <div className={styles.formItemA}>
          <label htmlFor="Province">Province </label>
          <input  value={Province} onChange={(e)=>{setProvince(e.target.value)}} className={styles.inpA} placeholder='CentralJava' type="text" id="Province" name="Province" />
          </div>
          </div>

          <div className={styles.formItem}>
          <label htmlFor="Bio">Bio </label>
          <input  value={bio} onChange={(e)=>{setbio(e.target.value)}} className={styles.inp} placeholder='I specialize in Cryptocurrency observation' type="text" id="Bio" name="Bio" />
          </div>
          <div className={styles.formItem}>
          <label htmlFor="TwilioAPI">Twilio API </label>
          <input  value={twillioApi} onChange={(e)=>{settwillioApi(e.target.value)}} className={styles.inp} placeholder='enter your twillio api key here' type="text" id="TwilioAPI" name="TwilioAPI" />
          </div>

          <div className={styles.formItem}>
          <label htmlFor="GoogleAPI">Google API </label>
          <input  value={googleApi} onChange={(e)=>{setgooglegoogleApi(e.target.value)}} className={styles.inp} placeholder='enter your google api key here' type="text" id="TwilioAPI" name="TwilioAPI" />
          </div>

        <div className={styles.sub}>
          <button onClick={(e)=>{e.preventDefault(); router.back();}} className={styles.backBtn}>Back</button>
          <button  onClick={(e)=>{e.preventDefault();   }}  className={styles.subButton}>Update Profile</button>
        </div>
  </form>
    </div>
  </div>
    </div>
  )
}
}

export default Page

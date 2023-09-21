"use client"
import Navbar from '../../components/Navbar'
import React, { useEffect, useState } from 'react'
import styles from "../../styles/profile.module.css"
import Sidebar from '../../components/Sidebar'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { redirect, useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { setdata } from  "../../redux/reducers/userSlice.js"
import ProtectedRoute from '@/components/PrivateRoute'
axios.defaults.withCredentials = true;

function Page() {
  const users=useSelector((state)=>{return state.users})
  const router=useRouter()
const [name,setname]=useState(users?.userdata?.name)
const [profilePicture,setprofilePicture]=useState('')
const [file,setFile]=useState(null)
const [country,setcountry]=useState(users?.userdata?.country)
const [city,setcity]=useState(users?.userdata?.city)
const [Province,setProvince]=useState(users?.userdata?.Province)
const [bio,setbio]=useState(users?.userdata?.bio)
const [twillioApi,settwillioApi]=useState(users?.userdata?.twilio_api)
const [googleApi,setgooglegoogleApi]=useState(users?.userdata?.google_api)

const dispatch=useDispatch()
const handleprofilepicturechange = (event) => {
  if (event.target.files && event.target.files[0]) {

    const allowedTypes = ['image/jpeg', 'image/png']; 
    const fileType = event.target.files[0].type;

    if (!allowedTypes.includes(fileType)) {
      toast.error(`Error : You can only upload Images !`)
    }else{
      setFile(event.target.files[0])
      setprofilePicture(URL.createObjectURL(event.target.files[0]));
    }
  }
};




const updateProfileHandler=async(e)=>{
  e.preventDefault()



  const formData = new FormData();
  formData.append('name', name);
  {file!==null?formData.append('photo', file):null}
  formData.append('country', country);
  formData.append('city', city);
  formData.append('province', Province);
  formData.append('bio', bio);
  formData.append('twilio_api', twillioApi);
  formData.append('google_api', googleApi);

  const res= await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/profile`,formData, {withCredentials: true,credentials: 'include'})
  setFile(null)

  if(res.data.success===true){
    toast.success("Profile Updated Successfully 🎉")
  dispatch(setdata(res.data.message))

  }else{
    toast.error(`Error :${res.data.message}`)

}

}

  return (
    <ProtectedRoute>

    <div className={styles.container}>
  <Sidebar />
  <div className={styles.home}>
    <Navbar />

    <div className={styles.details}>
    <div className={styles.hed}>
        <p>User Details</p>
     <Image src="https://d3k81nzjgcglm8.cloudfront.net/icons/info.png"  alt="profile_Picture" width={20} height={20}  className={styles.logo}   />
    </div>

  <form className={styles.form}>

    <div className={styles.formItem}>
          <div >Profile Photo </div>
          <label htmlFor="photo">
  {profilePicture==''?<Image src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${users?.userdata?.profilePhoto}`}  alt="profile_Picture" width={100} height={100}  className={styles.profilePicture}/>:<Image src={profilePicture}  alt="profile_Picture" width={100} height={100}  className={styles.profilePicture}/>}
             </label>
        <input hidden  onChange={handleprofilepicturechange}   type="file" id="photo" name="photo" />

        </div>

    <div className={styles.formItem}>
          <label htmlFor="Name">User Name </label>
          <input value={name} onChange={(e)=>{setname(e.target.value)}} className={styles.inp} placeholder='John Doe' type="text" id="Name" name="Name" />
        </div>
  
    <div className={styles.formItem}>
          <label htmlFor="Email">Email </label>
          <input readOnly value={users?.userdata?.email} className={styles.inp} placeholder='JohnDoe@gmail.com' type="text" id="Email" name="Email" />
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
          <button  onClick={updateProfileHandler}  className={styles.subButton}>Update Profile</button>
        </div>
  </form>
    </div>
  </div>
  <Toaster position="bottom-center"/>


    </div>
    </ProtectedRoute>
  )
}

export default Page

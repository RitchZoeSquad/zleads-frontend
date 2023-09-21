"use client"
import React, { useEffect, useState } from 'react';
import styles from "../../styles/emailverifier.module.css";
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation'; // Import the router from next/router
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { EmailVerifier, STATUS } from '@/redux/reducers/EmailVerifierSlice';
import validator from 'validator';
import { exportVerifiedLeadsData } from '@/utils/Functions';

function Page() {
  const { status, error, data } = useSelector((state) => state.emailverifier);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch()
  const router = useRouter();

  const [email, setemail] = useState('');
  const [selectedFile, setSelectedFile] = useState();


  useEffect(() => {
    if (status === STATUS.ERROR && error) {
      toast.error(error);
    }
  }, [status, error]);
  useEffect(() => {
    handleBulkVerification()

  }, [selectedFile]);

  const handleFileSelect = (e) => {

    if(users.isloggedin===false){
       router.push("/login")
      return
     }else{

       const file = e.target.files[0];
       if (!file) {
         toast.error('Select a File!');
         return 
        }
        else  if (file.type == 'text/csv') {
          setSelectedFile(file);
          return
        }else{
          toast.error('Select a CSV file Only!');
          return;
          
        }
      }
  };

  const submithandler = async (e) => {
    e.preventDefault();
    if(users.isloggedin===false){
       router.push("/login")
      return
     }
    else if (email === '') {
      toast.error("Provide an Email !");
      return
    }
    else {
      dispatch(EmailVerifier(email))
    }
  };
  const handleBulkVerification = async () => {
    if(selectedFile){

    const reader = new FileReader();
    reader.onload = async (e) => {
      const csvContent = e.target.result;
      const lines = csvContent.split('\n');
  
      const validEmails = [];
  
      lines.forEach((line) => {
        const cells = line.split(',');
  
        // Assuming email is in the first cell of each line
        const email = cells[0].trim();
        
        if (validator.isEmail(email)) {
          validEmails.push(email);
        }
      });
  
      if (validEmails.length === 0) {
        toast.error('No valid emails found in the file!');
        return;
      }
  
      dispatch(EmailVerifier(validEmails));
      setSelectedFile('')
    };
  
    reader.readAsText(selectedFile);
  }

  };


    
    
    return (
      <div className={styles.container}>
      <Sidebar curentPage="verifiedleads" />
      <div className={styles.home}>
        <Navbar />
        <div className={styles.heading}>Email Verifier</div>
        <div className={styles.searchbar}>
          <input
            type="text"
            className={styles.inp}
            value={email}
            placeholder='Enter Email...'
            onChange={(e) => { setemail([e.target.value]) }}
            />
          {status === STATUS.LOADING ?
            <Image src="https://d3k81nzjgcglm8.cloudfront.net/images/loader.gif" width={40} height={40} /> :
            <>
              <button onClick={submithandler} className={styles.frame}>Verify Email</button>
                
              <label  className={styles.frameB}  htmlFor="BulkEmailing">Bulk Email Verification </label>
          <input  hidden onChange={handleFileSelect}  id="BulkEmailing" name="BulkEmailing" type="file" />
            </>
          }
        </div>

    {
      data?  data.length === 0 ? (
        <div className={styles.showMsg}>
          No Result Found For This Email!
        </div>
      ) : (
        <div className={styles.containers}>
          <div className={styles.exportButton}> <button onClick={()=>{exportVerifiedLeadsData(data)}} className={styles.export}>Export</button></div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th >Name</th>
                <th >Email</th>
                <th>Status</th>
                <th>Score</th>
                <th>Result</th>
                <th>Smtp_check</th>
                <th>Disposable</th>
                <th>Registrar</th>
                <th>Created Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
              <td>
                          <div className={styles.name}>
                            <Image
                             alt="userImg"
                              className={styles.userImage}
                              width={40}
                              height={40}
                              src="https://d3k81nzjgcglm8.cloudfront.net/images/user.png"
                              />
                            <div>
                              <h4>{item.full_name ? `${val.full_name}` : 'Not Found'}</h4>
                            </div>
                          </div>
                        </td>
                  <td ><span className={styles.name}>{item?.email?.email?item?.email?.email: "Invalid Email "}</span></td>
                  <td>{item?.email?.status ?item?.email?.status : "Not Found"}</td>
                  <td>{item?.email?.score ?item?.email?.score : "Not Found"}</td>
                  <td>{item?.email?.result  ?item?.email?.result : "Not Found"}</td>
                  <td>{item?.email?.smtp_server?`${item?.email?.smtp_server}`: "Not Found"}</td>
                  <td>{item?.email?.disposable ?`${item?.email?.disposable }`: "Not Found"}</td>
                  <td>{item?.email?.whois?.registrar_name?item?.email?.whois?.registrar_name: "Not Found"}</td>
                  <td>{item?.email?.whois?.created_date?new Date(item?.email?.whois?.created_date).toLocaleDateString() : "Not Found"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
   :null }
      </div>
      <Toaster position="bottom-center"/>

    </div>
  );
}

export default Page;

"use client"
import React, { useState } from 'react'
import styles from "../styles/table.module.css"
import Image from 'next/image';
import { exportDataUsersWithoutWebsiteExcel, exportLeads } from '@/utils/Functions';
import Modal from 'react-modal';

function Table({type,data,url}) {

  const [showUserModel,setshowUserModel]=useState(false)
  const [ClikeduserInfo,setClikeduserInfo]=useState('')
    const renderCallLink = (phoneNumber) => {
        return (
          <a href={`tel:${phoneNumber}`}>
            <img alt="call_icon" src="https://d3k81nzjgcglm8.cloudfront.net/icons/call.png" width={40} height={40} />
          </a>
        );
      };
      const customStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgb(255 255 255 / 60%)",
            
          },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          height:"50%",
          width:"50%",
          backgroundColor:"white",
          border:"1px solid #757575",
          marginRight: '-50%',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          transform: 'translate(-50%, -50%)',
        },
      };
  return (
<div className={styles.containers}>

<div className={styles.exportButton}>
              {type === "withoutWebsite" ? <button onClick={() => { exportDataUsersWithoutWebsiteExcel(url) }} className={styles.exportExcel}>Export as Excel</button> : null}
              <button onClick={() => { exportLeads({ typeOfSearch: type, data: data }) }} className={styles.export}>Export</button>
            </div>

            <table className={styles.table}>
            <Modal
  isOpen={showUserModel}
  onRequestClose={() => setshowUserModel(false)}
  style={customStyles}
  contentLabel="Lead Modal"
>
  {ClikeduserInfo && (
    <div>
      <h2 className={styles.modelHeading}>Lead Details</h2>
      <p>
        <span className={styles.ModalKey}>Name</span> :{" "}
        <div className={styles.modalVal}>
          {type === "withWebsite"
            ? ClikeduserInfo.full_name || "Not Found"
            : ClikeduserInfo.name || "Not Found"}
        </div>
      </p>
     
      <p>
        <span className={styles.ModalKey}>
          {type === "withWebsite" ? "Email" : "Rating"}
        </span>{" "}
        :{" "}
        <div className={styles.modalVal}>
          {type === "withWebsite"
            ? ClikeduserInfo.email || "Not Found"
            : ClikeduserInfo.rating || "Not Found"}
        </div>
      </p>
      <p>
        <span className={styles.ModalKey}>Country</span> :{" "}
        <div className={styles.modalVal}>
          {ClikeduserInfo.country || "Not Found"}
        </div>
      </p>
      <p className={styles.ModalKey}>Phone Number: </p>
      <div className={styles.modalVal}>
        {type === "withWebsite" ? (
          ClikeduserInfo.phone_number === true ? (
            ClikeduserInfo.phoneInfo.intl_format
          ) : (
            "Not Found"
          )
        ) : (
          ClikeduserInfo.phone || "Not Found"
        )}
      </div>

      {type === "withWebsite" && (
        <>
          <p className={styles.ModalKey}>Gender: </p>
          <div className={styles.modalVal}>
            {ClikeduserInfo.gender == null ? "Not Found" : ClikeduserInfo.gender}
          </div>
          <p className={styles.ModalKey}>Position: </p>
          <div className={styles.modalVal}>
            {ClikeduserInfo.position == null
              ? "Not Found"
              : ClikeduserInfo.position}
          </div>
          <p className={styles.ModalKey}>Website: </p>
          <div className={styles.modalVal}>
            {ClikeduserInfo.website_url == null
              ? "Not Found"
              : ClikeduserInfo.website_url}
          </div>
          <p className={styles.ModalKey}>Twitter: </p>
          <div className={styles.modalVal}>
            {ClikeduserInfo.twitter == null
              ? "Not Found"
              : ClikeduserInfo.twitter}
          </div>
          <p className={styles.ModalKey}>Linkedin: </p>
          <div className={styles.modalVal}>
            {ClikeduserInfo.linkedin == null
              ? "Not Found"
              : ClikeduserInfo.linkedin}
          </div>
         
        </>
      )}

      {type === "withoutWebsite" && (
        <>
          <p className={styles.ModalKey}>Category: </p>
          <div className={styles.modalVal}>
            {ClikeduserInfo.category == null
              ? "Not Found"
              : ClikeduserInfo.category}
          </div>
        </>
      )}

      <p className={styles.ModalKey}>ID: </p>
      <div className={styles.modalVal}>{ClikeduserInfo.uid}</div>
      {/* Add more user details as needed */}
      <button
        className={styles.closeModel}
        onClick={() => {
          setshowUserModel(false);
          setClikeduserInfo('');
        }}
      >
        Close
      </button>
    </div>
  )}
</Modal>
              <thead>
                <tr>
                  <th>Name</th>
                  <th> {type === "withWebsite" ? "Email" : "Rating"}</th>
                  <th>Phone Number</th> 
                  <th>Company Name</th>
                  <th>{type === "withWebsite" ? "Website" : "Total Reviews"}</th>
                  <th>ID</th>
                  <th>Call</th>
                </tr>
              </thead>
              <tbody>
                {data.map((val, key) => (
                  <tr key={key}>
                    <td>
                      <div className={styles.name}>
                        <img
                        alt="user_icon"
                          className={styles.userImage}
                          width={40}
                          height={40}
                          src="https://d3k81nzjgcglm8.cloudfront.net/images/user.png"
                        />
                        <div>
                          <h4 className={styles.userName}  onClick={()=>{setshowUserModel(true);setClikeduserInfo(val)}}>{type === "withWebsite" ? val.full_name || "Not Found" : val.name || "Not Found"}</h4>
                          <h6>{val.type || "Not Found"}</h6>
                        </div>
                      </div>
                    </td>
                    <td>{type === "withWebsite" ? val.email || "Not Found" : val.rating || "Not Found"}</td>
                    <td>{type === "withWebsite" ? val.phone_number===true? val.phoneInfo.intl_format: "Not Found" : val.phone || "Not Found"}</td>
                    <td>{type === "withWebsite" ? val.company || "Not Found" : val.name || "Not Found"}</td>
                    <td>{type === "withWebsite" ? val.website_url || "Not Found" : val.reviews || "Not Found"}</td>
                    <td>{val.uid}</td>
                    <td>{type === "withWebsite" ? val.phone_number===true ? renderCallLink( val.phoneInfo.intl_format) : "Not Found" : val.phone ? renderCallLink(val.phone) : "Not Found"}</td>
                  </tr>
                ))}
              </tbody>
            </table>


</div>
  )
}

export default Table

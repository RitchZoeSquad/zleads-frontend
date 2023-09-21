"use client"
import Navbar from '../components/Navbar'
import React, { useEffect, useState } from 'react'
import styles from "../styles/home.module.css"
import Sidebar from '../components/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { FoundResult } from '@/redux/reducers/leadsSlice'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { industries, locations } from "../utils/data"
import Select from 'react-select/async';

import { STATUS } from '@/redux/reducers/EmailVerifierSlice'
import Table from '@/components/HomeTable'

axios.defaults.withCredentials = true;


function Page() {
  const users = useSelector((state) => { return state.users })
  const { foundResult, status, error, typeOfSearch, searchedText } = useSelector((state) => state.leads);
  const dispatch = useDispatch()
  const router = useRouter()

  const [search, setsearch] = useState()
  const [Industry, setIndustry] = useState()
  const [Location, setLocation] = useState()
  const [typeofsearch, settypeofsearch] = useState(typeOfSearch)
  const [showFilter, setshowFilter] = useState(true)
  const [itemsPerPage, setitemsPerPage] = useState(showFilter?4:5)

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;


  useEffect(() => {
    if (status === STATUS.ERROR && error) {
      toast.error(error);
    }
  }, [status, error]);


  


  const handleUserTypeChange = (event) => {
    settypeofsearch(event.target.value)
    setshowFilter(false)
    setitemsPerPage(5)
  };

  const submithandler = async (e) => {
    e.preventDefault();
    setshowFilter(false)
    if (users.isloggedin === false) {
      router.push("/login")
      return
    }

    if (search !== '' && users.isloggedin === true && typeofsearch === "withWebsite") {
      console.log("dispacthced")
      dispatch(FoundResult({ query: search, typeOfSearch: typeofsearch }))
    }
    else if (search !== '' && users.isloggedin === true && typeofsearch === "withoutWebsite") {
      dispatch(FoundResult({ query: search, typeOfSearch: typeofsearch, Industry: Industry, Location: Location }))
    }

  }

  const Categories = (inputValue, callback) => {
    // Simulate fetching options from the server
    const filteredOptions = industries.filter(item =>
      item.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filteredOptions);
  };
  const Locations = (inputValue, callback) => {
    // Simulate fetching options from the server
    const filteredOptions = locations.filter(item =>
      item.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filteredOptions);
  };

  return (
    <div className={styles.container}>


      <Sidebar curentPage="home" />
      <div className={styles.home}>
        <Navbar />

        <div className={styles.MainContainer}>


          {typeofsearch === 'withWebsite' ?

            <div className={styles.searchbar} >

              <input type="text" className={styles.inp} value={search} placeholder='Search Anything Here...' onChange={(e) => { setsearch(e.target.value) }} />

              <button disabled={status === STATUS.LOADING ? true : false} onClick={submithandler} className={styles.frame}>
                <img  alt="logo" src="https://d3k81nzjgcglm8.cloudfront.net/icons/search.png" width={24} height={24} />
              </button>
              <button onClick={() => {
                if (showFilter) {
                  setitemsPerPage(5);
                  setshowFilter(false)
                } else {

                  setitemsPerPage(4);
                  setshowFilter(true)
                }
              }} className={styles.filterIcon}>
                <img  alt="logo" src="https://d3k81nzjgcglm8.cloudfront.net/icons/Frame.png" width={24} height={24} />
              </button>
            </div>

            :
            <div className={styles.OutscraperSearchBar} >


              <input
                type="text"
                className={styles.inpO}
                value={search}
                onChange={(e) => { setsearch(e.target.value) }}
                placeholder="Search Anything Here..."
              />
              <div className={styles.SelectOptions}>

                <Select
                value={Industry}
                  styles={{
                    control: (baseStyles, state) => ({ ...baseStyles, height: "60px", cursor: "pointer", border: "1px solid #7e757552", borderRadius: "0px" })
                  }}
                  placeholder="Select Category"
                  cacheOptions
                  loadOptions={Categories}
                />
              </div>

              <div className={styles.SelectOptions}>

                <Select
                  value={Location}
                  styles={{
                    control: (baseStyles, state) => ({ ...baseStyles, height: "60px", cursor: "pointer", border: "1px solid #7e757552", borderRadius: "0px" })
                  }}

                  placeholder="Select Country"
                  cacheOptions
                  loadOptions={Locations}
                />
              </div>

              <button disabled={status === STATUS.LOADING ? true : false} onClick={submithandler} className={styles.frame}>
                <img alt="logo"  src="https://d3k81nzjgcglm8.cloudfront.net/icons/search.png" width={24} height={24} />
              </button>
              <button onClick={() => {
                if (showFilter) {
                  setitemsPerPage(5);
                  setshowFilter(false)
                } else {

                  setitemsPerPage(4);
                  setshowFilter(true)
                }
              }} className={styles.filterIcon}>
                <img alt="logo"  src="https://d3k81nzjgcglm8.cloudfront.net/icons/Frame.png" width={24} height={24} />
              </button>
            </div>

          }

          {
            showFilter ?

              <>
                <div className={styles.inpF}>
                  <input type="radio"
                    id="withWebsite"
                    value="withWebsite"
                    className={styles.checkbox}
                    checked={typeofsearch === "withWebsite"}
                    onChange={(e) => { handleUserTypeChange(e) }} />
                  <label className={styles.lbl} htmlFor="withWebsite" >Users with websites</label>
                </div>
                <div className={styles.inpF}>
                  <input type="radio"
                    id="withoutWebsite"
                    className={styles.checkbox}
                    value="withoutWebsite"
                    checked={typeofsearch === "withoutWebsite"}
                    onChange={(e) => { handleUserTypeChange(e) }} />
                  <label className={styles.lbl} htmlFor="withoutWebsite" >Users without websites</label>
                </div>
              </>
              : null}
        </div>
        {status === STATUS.LOADING ?
          <div className={styles.loading}>
            <img alt="loader"  src="https://d3k81nzjgcglm8.cloudfront.net/images/loader.gif" width={100} height={100} />

          </div> : null
        }

        {foundResult == null || status !== STATUS.IDLE ? null : foundResult && foundResult?.length === 0 ?
        
          <div className={styles.showMsg}>
            No leads Found For This Search !
          </div>
          :
          <>
          <div className={styles.containers}>
            <div className={styles.heading}>Search Result For - <span style={{ color: "#ED6214", fontSize: "22px" }}>{searchedText}</span></div>
         <Table type={typeOfSearch}  data={foundResult.slice(startIndex,endIndex)} url={foundResult[0].file_url}/>
        
            <div className={styles.pagination}>
              <button disabled={currentPage === 1 ? true : false} className={styles.pagination_control} onClick={()=>{setCurrentPage(currentPage-1)}}>Previous</button>

              <button className={styles.btn}>{currentPage}</button>
              <div >{currentPage + 1}</div>
              <button disabled={endIndex >= foundResult?.length ? true :false} className={styles.pagination_control}  onClick={()=>{setCurrentPage(currentPage+1)}}>Next</button>

            </div>
          </div>
          </>
            }

      </div>
      <Toaster position="bottom-center" />

    </div>
  )
}

export default Page

"use client"
import Navbar from '../../components/Navbar'
import React, { use, useEffect, useState } from 'react'
import styles from "../../styles/foundleads.module.css"
import Sidebar from '../../components/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import { setfoundLeads } from '@/redux/reducers/userSlice'
import ProtectedRoute from '@/components/PrivateRoute'
import LeadTable from '@/components/LeadsTable'
import { Stack } from '@/utils/StackForPagination'

function Page() {
  const { foundLeads, isloggedin } = useSelector((state) => state.users);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setloading] = useState(true);
  const [type, settype] = useState("withWebsite");
  const [FilterType, setFilterType] = useState("withWebsite");
  const [FilterDateSort, setFilterDateSort] = useState(false);
  const [DateParameter, setDateParameter] = useState(false);
  const [totalPages,settotalPages]=useState()
  const [model, setShowModel] = useState(false);

  const dispatch = useDispatch();

  const itemsPerPage = 7;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Create a stack instance
  const [paginationStack, setPaginationStack] = useState(new Stack());

  const fetchData = async () => {
    try {
      setloading(true);

      // Retrieve the last evaluated key from the stack
      const lastEvaluatedKey = paginationStack.peek();

      // Make the API request with the last evaluated key
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/services/foundleads?page=${currentPage}&typeOfSearch=${type}&type=${DateParameter}`,{
        lastEvaluatedKey  : lastEvaluatedKey
      });

      const { items, totalPages, lastCreatedAt } = response.data;

      dispatch(setfoundLeads(items));
      settotalPages(totalPages)
      // If there's a lastCreatedAt value, push it to the stack
        paginationStack.push(lastCreatedAt);

      setloading(false);
      setShowModel(false);

    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchData();
  }, [type, DateParameter, currentPage]);

  const nexthandler = () => {
    setCurrentPage(currentPage + 1);
  };

  const previoushandler = () => { 
   paginationStack.pop()
   paginationStack.pop()

    setCurrentPage(currentPage - 1);
  };

  const applyFilters = async () => {
    paginationStack.clear()
    
    setCurrentPage(1)
    setDateParameter(FilterDateSort);
    settype(FilterType);
  };

  return (
    <ProtectedRoute>

      <div className={styles.container}>
        <Sidebar curentPage="foundleads" />
        <div className={styles.home}>
          <Navbar />
          <div className={styles.headingP}>
                  <div className={styles.heading}>Found Leads  </div>
                  <button onClick={() => { model === true ? setShowModel(false) : setShowModel(true) }} className={styles.filterIcon}>
                    <img alt="logo" src="https://d3k81nzjgcglm8.cloudfront.net/icons/Frame.png" width={24} height={24} />
                  </button>
                </div>
                {model === true ? <div className={styles.model}>
                  <div className={styles.filt}>Filters</div>

                  <div className={styles.checkbox_btn} >
                    <div>Users with Website</div>
                    <input
                      className={styles.checkbox}
                      id={`typeOfSearch`}
                      type="checkbox"
                      checked={FilterType==="withWebsite"}
                      onChange={()=>{FilterType==="withWebsite" ? setFilterType("withoutWebsite") : setFilterType("withWebsite")}}
                    />
                    <label
                      className={styles.switch_label}
                      htmlFor={`typeOfSearch`}
                    >
                      <span className={styles.switch_button} />
                    </label>
                  </div>
                  <div className={styles.checkbox_btn} >
                    <div>Oldest To Latest</div>
                    <input
                      className={styles.checkbox}
                      id={`latToOld`}
                      type="checkbox"
                      checked={FilterDateSort===true}
                      onChange={()=>{FilterDateSort===true ? setFilterDateSort(false) : setFilterDateSort(true)}}
                    />
                    <label
                      className={styles.switch_label}
                      htmlFor={`latToOld`}
                    >
                      <span className={styles.switch_button} />
                    </label>
                  </div>
                  <button onClick={applyFilters} className={styles.apply_filters}>Apply Filters</button>

                </div>
                  : null}
          {loading === true ?
            <div className={styles.loading}>
              <img alt="loader" src="https://d3k81nzjgcglm8.cloudfront.net/images/loader.gif" width={100} height={100} />
            </div>
            :
            foundLeads?.length === 0 ?
              <div className={styles.showMsg}>
                No Leads Found !
              </div>
              : <>
            
                <LeadTable url={foundLeads[0].lead.file_url} risky={false} data={foundLeads} type={type} />
                <div className={styles.pagination}>
                  <button disabled={currentPage === 1 ? true : false} className={styles.pagination_control} onClick={previoushandler}>Previous</button>

                  <button className={styles.btn}>{currentPage}</button>
                  <div >{currentPage + 1}</div>
                  <button disabled={currentPage==totalPages ? true : false} className={styles.pagination_control} onClick={nexthandler}>Next</button>
                </div>
              </>
          }

        </div>
        <Toaster position="bottom-center" />

      </div>
    </ProtectedRoute>
  );
}

export default Page;

import React,{ useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Footer from "../Footer";
import {useLocation} from 'react-router-dom';
function PartnerTransaction() {
    const [data, setData] = useState([{}])
    const [isshow,setIsShow] = useState(false)
    
    const location = useLocation();
        //console.log("this is receving") 
      const partnerData = location.state.sendData;
      console.log(partnerData.partner_id)
      const partner_id = partnerData.partner_id

      useEffect(() => {
        axios
        .post("/partner/transaction", {partner_id:partner_id})
        .then(res => {
          console.log(res.data)
          setData(res.data)
          setIsShow(true)
        }).catch(err =>{
            console.log(err)
        })
        },[]);

       return (
        <>
      <Navbar/>
      <Sidebar/>
      <div class="main-content">
        <section class="section">
          <div class="section-body">
            <h2 class="section-title">September 2018</h2>
            <div class="row">
              <div class="col-12">
                {isshow && (
                    <div class="activities">
                    {data && data.map(TransactionDetails => (
                        <div class="activity">
                            <div class="activity-icon bg-primary text-white">
                                <i class="fas fa-sign-out-alt"></i>
                            </div>
                            <div class="activity-detail">
                                <div class="mb-2">
                                    <span class="text-job">1 hour ago</span>
                                    <span class="bullet"></span>
                                </div>
                                <div style={{display:"flex", flexWrap:"nowrap", width:"100%"}}>
                                    <div style={{}}><p><b style={{marginRight:"8px"}}>Name :</b> {TransactionDetails.partner_name}</p></div>
                                    <div style={{marginLeft:"50px"}}><p><b style={{marginRight:"10px"}}>Total profit :</b>{TransactionDetails.total_profit}</p></div>
                                    <div style={{marginLeft:"50px"}}><p><b style={{marginRight:"10px"}}>Order Total :</b>{TransactionDetails.bill_total}</p></div>
    
                                    {/* <p><b style={{marginRight:"20px"}}>Name :</b> <p>{TransactionDetails.partner_name}</p> <b style={{marginRight:"20px"}}>Total profit</b>{TransactionDetails.total_profit}</p> */}
                                </div>
                                <div style={{display:"flex", flexWrap:"nowrap", width:"100%"}}>
                                    <div><p><b style={{marginRight:"10px"}}>Book Title :</b>{(TransactionDetails.book_title_arr).join(', ')}</p></div>
                                    <div style={{marginLeft:"50px"}}><p><b style={{marginRight:"10px"}}>percentage :</b>{(TransactionDetails.percentage).join(', ')}</p></div>
                                </div>
    
                                
                                {/* <p>Moved the task "<a href="#">Fix some features that are bugs in the master module</a>" from
                                Progress to Finish.</p> */}
                            </div>
                        </div>
                    ))}
    
                    </div>
                )}

              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer/>
        </>
       );
    }


export default PartnerTransaction;
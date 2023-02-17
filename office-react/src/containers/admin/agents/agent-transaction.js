import React,{ useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Footer from "../Footer";
import {useLocation} from 'react-router-dom';
function AgentTransaction() {
    const [data, setData] = useState([{}])
    const [isshow,setIsShow] = useState(false)
    
    const location = useLocation();
        //console.log("this is receving") 
      const AgentData = location.state.sendData;
      console.log(AgentData.partner_id)
      const agent_id = AgentData.agent_id

      useEffect(() => {
        axios
        .post("http://localhost:8000/agent/transaction", {agent_id:agent_id})
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
                                    <div style={{}}><p><b style={{marginRight:"8px"}}>Order No :</b> {TransactionDetails.bill_id}</p></div>
                                    <div style={{marginLeft:"50px"}}><p><b style={{marginRight:"10px"}}>Total Bill Amount :</b>{TransactionDetails.bill_total}</p></div>
                                    <div style={{marginLeft:"50px"}}><p><b style={{marginRight:"10px"}}>Commission percentage :</b>{TransactionDetails.commission_percentage}%</p></div>
                                    <div style={{marginLeft:"50px"}}><p><b style={{marginRight:"10px"}}>Commission Amount :</b>{TransactionDetails.commission_amount}</p></div>
    
                                    {/* <p><b style={{marginRight:"20px"}}>Name :</b> <p>{TransactionDetails.partner_name}</p> <b style={{marginRight:"20px"}}>Total profit</b>{TransactionDetails.total_profit}</p> */}
                                </div>
                                <div style={{border : "1px solid lightgray", marginBottom:"10px"}}></div>
                                <div style={{display:"flex", flexWrap:"nowrap", width:"100%"}}>
                                    {/* <div><p><b style={{marginRight:"10px"}}>Book Title :</b>{(TransactionDetails.book_title_arr).join(', ')}</p></div> */}
                                    
                                    <div>
                                      <div><p><b style={{marginRight:"10px"}}>Book Title</b></p></div>
                                      { TransactionDetails && (TransactionDetails.book_title_arr).map(Details => (
                                        <div >{Details}</div>
                                      ))}
                                    </div>
                                    <div style={{marginLeft:"60px"}}>
                                      <p><b style={{marginRight:"10px"}}>Quantity</b></p>
                                      { TransactionDetails && (TransactionDetails.books_quantity).map(Details => (
                                        <div style={{marginLeft:"20px"}}>{Details}</div>
                                      ))}
                                    </div>
                                   {/*  <div style={{marginLeft:"80px"}}>
                                      <div><p><b >Profit</b></p></div>
                                      { TransactionDetails && (TransactionDetails.each_book_profit).map(Details => (
                                        <div >{Details}</div>
                                      ))}
                                    </div> */}


                                    {/* <div style={{marginLeft:"50px"}}><p><b style={{marginRight:"10px"}}>percentage :</b>{(TransactionDetails.percentage).join(', ')}</p></div> */}

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


export default AgentTransaction;
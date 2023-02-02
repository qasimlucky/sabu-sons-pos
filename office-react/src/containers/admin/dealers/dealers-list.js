import React,{ useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Link,useNavigate } from 'react-router-dom';

function DealerList() {
  const [data, setposts] = useState([{}])

    useEffect(() => {
      axios.get("/dealer/get").then(Response =>{
        console.log(Response.data
          )
        setposts(Response.data)
      }).catch(err =>{
        console.log(err)
      })
      },[]);

      let navigate = useNavigate();
      function editSale(sendData){
          console.log("this is send dataaaaa")
          console.log(sendData)
          navigate("/editdealerform",{state:{sendData:sendData}})
           
        }

       return (
        <>
      <Navbar/>
      <Sidebar/>
      <div className="main-content">
        <section className="section">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h4>All Dealer</h4>
                  <div className="card-header-form">
                    <Link to="/adddealers" className="btn btn-success ">
                      + Add User
                    </Link>
                  </div>
                </div>
                <div className="card-header mb-3">
                  <div>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                      />
                      <div className="input-group-btn ml-1">
                        <button className="btn btn-primary">
                          <i className="fas fa-search" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown d-inline ml-1">
                    <button
                      className="btn btn-danger dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Country
                    </button>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </div>
                  </div>
                  <div className="dropdown d-inline ml-1 float-right">
                    <button
                      className="btn btn-danger dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      State
                    </button>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <tbody>
                        <tr className="align-center">
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email</th>
                          <th>Phone Number</th>
                          <th>Status</th>
                          <th>Action</th>
                         </tr> 
                         {data.map(dealerDetails => ( 
                          <tr className="align-center">

                          <td>{dealerDetails.first_name}</td>
                          <td>{dealerDetails.last_name}</td>
                          <td>{dealerDetails.email}</td>
                          <td>{dealerDetails.phone_number}</td>
                          <td>
                            <div className="badge badge-success badge-shadow" style={{padding:"8px"}}>
                              Active
                            </div>
                          </td>
                          <td>
                            <a  onClick={()=>editSale(dealerDetails)} href="#" className="btn btn-primary">
                              Edit
                            </a>
                          </td>
                        </tr>
                           ))} 
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer/>
        </>
       );
    }

export default DealerList;
import React,{ useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Link,useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

function DealerList() {
  const [data, setposts] = useState([{}])
  const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
      axios.get("https://subo-sons-backend.onrender.com/dealer/get").then(Response =>{
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

        
      var itemsPerPage = 6
      // Simulate fetching items from another resources.
      // (This could be items from props; or items loaded in a local state
      // from an API endpoint with useEffect and useState)
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      const currentItems = data.slice(itemOffset, endOffset);
      const pageCount = Math.ceil(data.length / itemsPerPage);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % data.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

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
                      + Add Dealer
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
                         {currentItems.map(dealerDetails => ( 
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
                    <div >
                      <ReactPaginate
                          previousLabel="Previous"
                          nextLabel="Next"
                          pageClassName="page-item"
                          pageLinkClassName="page-link"
                          previousClassName="page-item"
                          previousLinkClassName="page-link"
                          nextClassName="page-item"
                          nextLinkClassName="page-link"
                          breakLabel="..."
                          breakClassName="page-item"
                          breakLinkClassName="page-link"
                          pageCount={pageCount}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={8}
                          onPageChange={handlePageClick}
                          containerClassName="pagination"
                          activeClassName="active"
                          />

                      </div>
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
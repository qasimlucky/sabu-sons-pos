import React,{ useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Link,useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

function StockList() {
  const [data, setData] = useState([{}])
  const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
      axios.get("/stock/get").then(Response =>{
        console.log(Response.data)
        setData(Response.data)
      }).catch(err =>{
        console.log(err)
      })
      },[]);

      let navigate = useNavigate();
      function editSale(sendData){
          console.log("this is send dataaaaa")
          console.log(sendData)
          navigate("/editstock",{state:{sendData:sendData}})
           
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
                  <h4>All Stock</h4>
                  <div className="card-header-form">
                    <Link to="/addstock" className="btn btn-success ">
                      + Add Stock
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
                          <th>Book Title</th>
                          <th>Quantity</th>
                          <th>Retail Price</th>
                          <th>Sale Price</th>
                          <th>Auther</th>
                          <th>Status</th>
                          <th>Action</th>
                         </tr> 
                         {currentItems.map(stockDetails => ( 
                          <tr className="align-center">

                          <td>{stockDetails.book_title}</td>
                          <td>{stockDetails.quantity}</td>
                          <td>{stockDetails.retail_price}</td>
                          <td>{stockDetails.sale_price}</td>
                          <td>{stockDetails.auther}</td>
                          <td>
                            {/* <div className="badge badge-success badge-shadow" style={{padding:"8px"}}>
                              Active
                            </div> */}
                            {(() => {
                             if (stockDetails.stock_status == 'Active'){
                              return (
                                <div className="badge badge-success badge-shadow p-2">
                                  {stockDetails.stock_status}
                                  </div>
                             )
                              }else{
                                return(
                                  <div className="badge badge-danger badge-shadow p-2">
                                {stockDetails.stock_status}
                                </div>
                                )
                              }
              
                            })()}
                          </td>
                          <td>
                            <a  onClick={()=>editSale(stockDetails)} href="#" className="btn btn-primary">
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

export default StockList;
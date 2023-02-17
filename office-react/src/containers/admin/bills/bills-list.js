
import React,{ useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function AllBill() {
  const [data, setData] = useState([])
  const [itemOffset, setItemOffset] = useState(0);
  const MySwal = withReactContent(Swal)
  let navigate = useNavigate();


  useEffect(() => {
   async function GetRequest(){
     await axios.get("https://subo-sons-backend.onrender.com/bill/get")
      .then(Response =>{
        console.log(Response.data)
        setData(Response.data)
      }).catch(err =>{
        console.log("this is error")
        console.log(err)
      })
      console.log("ready to destructure")
      console.log(data)

    }
    GetRequest();
    /* data.forEach(myfunction)
    function myfunction(item){
      console.log(item.bill_items)
    } */
    },[]);

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
  

    function DeleteBill(billDetails){
     var bill_id =  billDetails.bill_id
     console.log(bill_id)
      axios
      .post("/bill/delete", {bill_id:bill_id})
      .then(res => {
        setData(res.data)
        console.log(res.data)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Bill has been Deleted',
          showConfirmButton: false,
          timer: 1500
        })
      }).catch(err =>{
          console.log(err)
          Swal.fire({
              position: 'top-end',
              icon: 'error',
              text: 'Something went wrong!',
              showConfirmButton: false,
              timer: 1500
            })
      }) 
    } 

    function OpenBill(billDetails){
      console.log(billDetails)
      navigate("/bill",{state:{sendData:billDetails}})
    }
    function EditBill(billDetails){
      console.log(billDetails)
      navigate("/pos",{state:{sendData:billDetails}})
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
                    <h4>All Posts</h4>
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
                            <th>Bill Number</th>
                            <th>Discount</th>
                            <th>Shipping</th>
                            <th>Tax</th>
                            <th>Total Amount</th>
                            <th>Bill Status</th>
                            <th>Action</th>
                          </tr>
                              {currentItems.map(billDetails => ( 
                            <tr className="align-center">
                            <td>{billDetails.bill_collection_index}</td>
                            <td>{billDetails.bill_discount}</td>
                            <td>{billDetails.bill_shipping}</td>
                            <td>{billDetails.bill_tax}</td>
                            <td>{billDetails.bill_total}</td>
                            <td>
                              {(() => {
                              if (billDetails.bill_status == 'Active'){
                                return (
                                  <div className="badge badge-success badge-shadow p-2">
                                    {billDetails.bill_status}
                                    </div>
                              )
                                }else{
                                  return(
                                    <div className="badge badge-danger badge-shadow p-2">
                                  {billDetails.bill_status}
                                  </div>
                                  )
                                }
                
                              })()}
                            </td>

                            
                            <td>
                              <BsFillEyeFill onClick={()=>OpenBill(billDetails)}  style={{margin:"5px", fontSize:"20px",color:"green"}}/>
                              <BsFillTrashFill onClick={() => DeleteBill(billDetails)}  style={{margin:"5px", fontSize:"20px",color:"red"}}/>
                              <BsPencilSquare onClick={()=>EditBill(billDetails)}   style={{margin:"5px", fontSize:"20px",color:"blue"}}/>
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
       )
}
export default AllBill;
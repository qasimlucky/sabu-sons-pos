import React, { useState } from "react";
import {useLocation,useNavigate} from 'react-router-dom';
import axios from "axios";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function EditDealerForm(props) {
  let navigate = useNavigate();
  const MySwal = withReactContent(Swal)

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  })

  function handle(e) {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    newdata["dealer_id"] = dealerData.dealer_id
    setData(newdata)
   // console.log(data)
  }
  const url = "https://subo-sons-backend.onrender.com/dealer/edit"
  function submit(e) {
    console.log("this is send data to server")
    console.log(data)
    e.preventDefault();
    axios
      .post(url, data)
      .then(res => {
        /* Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        }) */
        Swal.fire({
          icon: 'success',
          title: 'Congratulations',
          text: 'Updated Dealer Info!!!!',
        })
        console.log(res.data)
        navigate("/alldealer")
      }).catch(err =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
          console.log(err)
          navigate("/alldealer")
        })

  }
  const location = useLocation();
  // console.log(location.state.sendData) 
    const dealerData = location.state.sendData
    //console.log("this is dealerData")
    //console.log(dealerData)
  return (
    <>
      <Navbar />
      <Sidebar />

      <div id="app" style={{ marginTop: 150 }}>
        <section class="section">
          <div class="container mt-10">
            <div class="row">
              <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-11 offset-xl-2">
                <div class="card card-primary">
                  <div class="card-header">
                    <h4>Add Dealer</h4>
                  </div>
                  <div class="card-body">
                    <form onSubmit={(e) => submit(e)} method="HTTP_METHOD" enctype="multipart/form-data">


                      <label className="badge badge-primary badge-shadow" style={{ padding: "8px" }}>Sale Details</label>
                      <div class="row">
                        <div class="form-group col-6">
                          <label for="">First Name</label>
                          <input onChange={(e) => handle(e)} id="first_name" type="text" class="form-control" name="first_name" placeholder="e.g Ali" defaultValue={dealerData.first_name}/>
                        </div>
                        <div class="form-group col-6">
                          <label for="">Last Name</label>
                          <input onChange={(e) => handle(e)} id="last_name" type="text" class="form-control" name="last_name" placeholder="e.g Raza" defaultValue={dealerData.last_name} />
                        </div>
                      </div>
                      <label className="badge badge-primary badge-shadow" style={{ padding: "8px" }}>Contact info</label>
                      <div class="row">
                        <div class="form-group col-6">
                          <label for="">Phone Number</label>
                          <input onChange={(e) => handle(e)} id="phone_number" type="text" class="form-control" name="phone_number" placeholder="e.g 0321-7171898" defaultValue={dealerData.phone_number}/>
                        </div>
                        <div class="form-group col-6">
                          <label for="">Email</label>
                          <input onChange={(e) => handle(e)} id="email" type="text" class="form-control" name="email"  placeholder="e.g newdealer@gmail.com"/>
                        </div>
                      </div>
                      <label className="badge badge-primary badge-shadow" style={{ padding: "8px" }}>credentials</label>
                      <div class="row">
                        <div class="form-group col-6">
                          <label>password</label>
                          <input onChange={(e) => handle(e)} id="password" type="text" class="form-control" name="password" placeholder="Please select strong password" defaultValue={dealerData.password}/>
                        </div>
                      </div>

                      <div class="row">
                      <div class="form-group col-4"></div>
                        <div class="form-group col-4">
                          <button type="submit" class="btn btn-success btn-lg btn-block" style={{marginTop:"15px"}}>
                            Edit Dealer
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}


export default EditDealerForm;
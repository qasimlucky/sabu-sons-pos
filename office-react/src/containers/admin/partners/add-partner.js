import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function AddPartner(props) {

  const MySwal = withReactContent(Swal)
  const [data, setData] = useState({})

  function handle(e) {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    setData(newdata)
   // console.log(data)
  }
  const url = "/partner/add"
  function submit(e) {
    console.log(data)
    e.preventDefault();
    axios
      .post(url, data)
      .then(res => {
        console.log(res.data)
        Swal.fire({
          icon: 'success',
          title: 'Congratulations',
          text: 'New Partner  Add!!!!',
          showConfirmButton: false,
          timer: 1500
        })
      }).catch(err =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          showConfirmButton: false,
          timer: 1500
        })
          console.log(err)
        })

  }

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
                    <h4>Add Partner</h4>
                  </div>
                  <div class="card-body">
                    <form onSubmit={(e) => submit(e)} method="HTTP_METHOD" enctype="multipart/form-data">


                      <label className="badge badge-primary badge-shadow" style={{ padding: "8px" }}>Partner Details</label>
                      <div class="row">
                        <div class="form-group col-6">
                          <label for="">First Name</label>
                          <input onChange={(e) => handle(e)} id="first_name" type="text" class="form-control" name="first_name" placeholder="e.g Ali" />
                        </div>
                        <div class="form-group col-6">
                          <label for="">Last Name</label>
                          <input onChange={(e) => handle(e)} id="last_name" type="text" class="form-control" name="last_name" placeholder="e.g Raza"  />
                        </div>
                      </div>
                      <label className="badge badge-primary badge-shadow" style={{ padding: "8px" }}>Contact info</label>
                      <div class="row">
                        <div class="form-group col-6">
                          <label for="">Phone Number</label>
                          <input onChange={(e) => handle(e)} id="phone_number" type="text" class="form-control" name="phone_number" placeholder="e.g 0321-7171898"  />
                        </div>
                        <div class="form-group col-6">
                          <label for="">Email</label>
                          <input onChange={(e) => handle(e)} id="email" type="text" class="form-control" name="email"  placeholder="e.g newdealer@gmail.com"/>
                        </div>
                      </div>
                      <label className="badge badge-primary badge-shadow" style={{ padding: "8px" }}>Percentage Details</label>
                      <div class="row">
                        <div class="form-group col-6">
                          <label>Percentage</label>
                          <input onChange={(e) => handle(e)} id="percentage" type="text" class="form-control" name="percentage" placeholder="Should be %"/>
                        </div>
                      </div>

                      <div class="row">
                      <div class="form-group col-4"></div>
                        <div class="form-group col-4">
                          <button type="submit" class="btn btn-success btn-lg btn-block" style={{marginTop:"15px"}}>
                            Add Partner
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


export default AddPartner;
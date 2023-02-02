import React from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
class AddUserForm extends React.Component{
    
    constructor(props) {
      super(props)
    
      this.state = {
        provider_id : "",
        provider : "",

      }
    }
    submitHandler = e =>{
        e.preventDefault()
        console.log(this.state)
        axios
        .post("api/auth", this.state)
        .then(Response =>{
            console.log(Response
              )
          })
        .catch(err =>{
            console.log(err)
          })
    }

    changeHandler = e =>{
        this.setState({[e.target.name]:e.target.value})
    }
    render(){
        const{provider_id,provider}= this.state
       return (
        <>
        <Navbar/>
      <Sidebar/>
  <div id="app" style={{marginTop : 200}}>
    <section class="section">
      <div class="container mt-5">
        <div class="row">
          <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2">
            <div class="card card-primary">
              <div class="card-header">
                <h4>Register</h4>
              </div>
              <div class="card-body">
                <form onSubmit={this.submitHandler}>
                  <div class="row">
                    <div class="form-group col-6">
                      <label for="frist_name">Phone-Number</label>
                      <input id="frist_name" type="text" class="form-control" name="provider_id" value = {provider_id} onChange={this.changeHandler} autofocus/>
                    </div>
                    <div class="form-group col-6">
                      <label for="last_name">Provider</label>
                      <input id="last_name" type="text" class="form-control" name="provider" value= {provider} onChange={this.changeHandler} />
                    </div>
                  </div>
                  <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-lg btn-block">
                      Register
                    </button>
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
}

export default AddUserForm;
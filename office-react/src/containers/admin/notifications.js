import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from 'react-router-dom';
class Notification extends React.Component{
    render(){
       return (
        <>
      <Navbar/>
      <Sidebar/>
      <NotificationsMainContent/>
      <Footer/>
  

        </>
       );
    }
}

class NotificationsMainContent extends React.Component{
    render(){
       return (
        <div>
      <div className="main-content">
        <section className="section">
          <div className="row">
            <div className="col-12">
              <h4 className="mb-4">All Notifications</h4>
              <div className="card card-danger">
                <div className="card-body">
                  <div className="row">
                    <img
                      alt="image"
                      src="/assets/img/users/user-5.png"
                      className="rounded-circle ml-4"
                      width={55}
                      data-toggle="tooltip"
                    />
                    <p className="ml-4">
                      <h5>Lorem Ipsum is 1</h5>
                      Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy
                      Lorem Ipsum is simply dummy
                    </p>
                  </div>
                </div>
              </div>
              <div className="card card-danger">
                <div className="card-body">
                  <div className="row">
                    <img
                      alt="image"
                      src="/assets/img/users/user-5.png"
                      className="rounded-circle ml-4"
                      width={55}
                      data-toggle="tooltip"
                    />
                    <p className="ml-4">
                      <h5>Lorem Ipsum is 1</h5>
                      Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy
                      Lorem Ipsum is simply dummy
                    </p>
                  </div>
                </div>
              </div>
              <div className="card card-danger">
                <div className="card-body">
                  <div className="row">
                    <img
                      alt="image"
                      src="/assets/img/users/user-5.png"
                      className="rounded-circle ml-4"
                      width={55}
                      data-toggle="tooltip"
                    />
                    <p className="ml-4">
                      <h5>Lorem Ipsum is 1</h5>
                      Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy
                      Lorem Ipsum is simply dummy
                    </p>
                  </div>
                </div>
              </div>
              <div className="card card-danger">
                <div className="card-body">
                  <div className="row">
                    <img
                      alt="image"
                      src="/assets/img/users/user-5.png"
                      className="rounded-circle ml-4"
                      width={55}
                      data-toggle="tooltip"
                    />
                    <p className="ml-4">
                      <h5>Lorem Ipsum is 1</h5>
                      Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy
                      Lorem Ipsum is simply dummy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
       );
    }
}
export default Notification;
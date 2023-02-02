import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from 'react-router-dom';
class Subscription extends React.Component{
    render(){
       return (
        <>
      <Navbar/>
      <Sidebar/>
      <SubscriptionMainContent/>
      <Footer/>
  

        </>
       );
    }
}

class SubscriptionMainContent extends React.Component{
    render(){
       return (
        <div>
      <div className="main-content">
        <section className="section">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h4>All Subscriptions</h4>
                  <div className="card-header-form">
                    <a href="#" className="btn btn-success ">
                      {" "}
                      + Add Subscription
                    </a>
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
                          <th>ID</th>
                          <th>Title</th>
                          <th>Amount</th>
                          <th>Type</th>
                          <th>Features</th>
                          <th>Action</th>
                        </tr>

                        <tr className="align-center">
                          <td> 1</td>
                          <td>Gold</td>
                          <td>$ 399</td>
                          <td>Yearly</td>
                          <td>50 User, Unlimited Swipe, Boost Your Account</td>
                          <td>
                            <div className="dropdown d-inline ml-1">
                              <a
                                className="fas fa-ellipsis-v"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              ></a>
                              <div className="dropdown-menu">
                                <a className="dropdown-item" href="#">
                                  <i className="fas fa-eye mr-2" />
                                  View
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i className="fas fa-edit mr-2" />
                                  Edit
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i className="fas fa-trash mr-2" />
                                  Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr className="align-center">
                          <td> 2</td>
                          <td>Silver</td>
                          <td>$ 299</td>
                          <td>Yearly</td>
                          <td>50 User, Unlimited Swipe, Boost Your Account</td>
                          <td>
                            <div className="dropdown d-inline ml-1">
                              <a
                                className="fas fa-ellipsis-v"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              ></a>
                              <div className="dropdown-menu">
                                <a className="dropdown-item" href="#">
                                  <i className="fas fa-eye mr-2" />
                                  View
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i className="fas fa-edit mr-2" />
                                  Edit
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i className="fas fa-trash mr-2" />
                                  Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr className="align-center">
                          <td> 3</td>
                          <td>Silver</td>
                          <td>$ 199</td>
                          <td>Monthly</td>
                          <td>50 User, Unlimited Swipe, Boost Your Account</td>
                          <td>
                            <div className="dropdown d-inline ml-1">
                              <a
                                className="fas fa-ellipsis-v"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              ></a>
                              <div className="dropdown-menu">
                                <a className="dropdown-item" href="#">
                                  <i className="fas fa-eye mr-2" />
                                  View
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i className="fas fa-edit mr-2" />
                                  Edit
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i className="fas fa-trash mr-2" />
                                  Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr className="align-center">
                          <td> 4</td>
                          <td>Custom</td>
                          <td>-</td>
                          <td>-</td>
                          <td>
                            Picture can see, Unlimited Swipe, QR Code, Turn Off
                            Ads
                          </td>
                          <td>
                            <div className="dropdown d-inline ml-1">
                              <a
                                className="fas fa-ellipsis-v"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              ></a>
                              <div className="dropdown-menu">
                                <a className="dropdown-item" href="#">
                                  <i className="fas fa-eye mr-2" />
                                  View
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i className="fas fa-edit mr-2" />
                                  Edit
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i className="fas fa-trash mr-2" />
                                  Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
export default Subscription;
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from 'react-router-dom';
class Event extends React.Component{
    render(){
       return (
        <>
      <Navbar/>
      <Sidebar/>
      <EventMainContent/>
      <Footer/>
  

        </>
       );
    }
}

class EventMainContent extends React.Component{
    render(){
       return (
        <div>
      <div className="main-content">
        <section className="section">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h4>All Events</h4>
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
                          <th>Image</th>
                          <th>Title</th>
                          <th>Amount Of People</th>
                          <th>Location</th>
                          <th>Event Date & Time</th>
                          <th>Action</th>
                        </tr>
                        <tr className="align-center">
                          <td> 1</td>
                          <td>
                            <img
                              alt="image"
                              src="/assets/img/users/user-5.png"
                              className="rounded-circle"
                              width={35}
                              data-toggle="tooltip"
                            />
                          </td>
                          <td>VIP - Circle</td>
                          <td>24</td>
                          <td>California</td>
                          <td>25/5/2022 - 12:30 PM</td>
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
                          <td> 1</td>
                          <td>
                            <img
                              alt="image"
                              src="/assets/img/users/user-5.png"
                              className="rounded-circle"
                              width={35}
                              data-toggle="tooltip"
                            />
                          </td>
                          <td>VIP - Circle</td>
                          <td>24</td>
                          <td>California</td>
                          <td>25/5/2022 - 12:30 PM</td>
                          <td>
                            <div className="dropdown d-inline ml-1">
                              <i
                                className="fas fa-ellipsis-v"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              />
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
                          <td> 1</td>
                          <td>
                            <img
                              alt="image"
                              src="/assets/img/users/user-5.png"
                              className="rounded-circle"
                              width={35}
                              data-toggle="tooltip"
                            />
                          </td>
                          <td>VIP - Circle</td>
                          <td>24</td>
                          <td>California</td>
                          <td>25/5/2022 - 12:30 PM</td>
                          <td>
                            <div className="dropdown d-inline ml-1">
                              <i
                                className="fas fa-ellipsis-v"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              />
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
                          <td> 1</td>
                          <td>
                            <img
                              alt="image"
                              src="/assets/img/users/user-5.png"
                              className="rounded-circle"
                              width={35}
                              data-toggle="tooltip"
                            />
                          </td>
                          <td>VIP - Circle</td>
                          <td>24</td>
                          <td>California</td>
                          <td>25/5/2022 - 12:30 PM</td>
                          <td>
                            <div className="dropdown d-inline ml-1">
                              <i
                                className="fas fa-ellipsis-v"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              />
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
                          <td> 1</td>
                          <td>
                            <img
                              alt="image"
                              src="/assets/img/users/user-5.png"
                              className="rounded-circle"
                              width={35}
                              data-toggle="tooltip"
                            />
                          </td>
                          <td>VIP - Circle</td>
                          <td>24</td>
                          <td>California</td>
                          <td>25/5/2022 - 12:30 PM</td>
                          <td>
                            <div className="dropdown d-inline ml-1">
                              <i
                                className="fas fa-ellipsis-v"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              />
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
                          <td> 1</td>
                          <td>
                            <img
                              alt="image"
                              src="/assets/img/users/user-5.png"
                              className="rounded-circle"
                              width={35}
                              data-toggle="tooltip"
                            />
                          </td>
                          <td>VIP - Circle</td>
                          <td>24</td>
                          <td>California</td>
                          <td>25/5/2022 - 12:30 PM</td>
                          <td>
                            <div className="dropdown d-inline ml-1">
                              <i
                                className="fas fa-ellipsis-v"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              />
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
                          <td> 1</td>
                          <td>
                            <img
                              alt="image"
                              src="/assets/img/users/user-5.png"
                              className="rounded-circle"
                              width={35}
                              data-toggle="tooltip"
                            />
                          </td>
                          <td>VIP - Circle</td>
                          <td>24</td>
                          <td>California</td>
                          <td>25/5/2022 - 12:30 PM</td>
                          <td>
                            <div className="dropdown d-inline ml-1">
                              <i
                                className="fas fa-ellipsis-v"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              />
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
                          <td> 1</td>
                          <td>
                            <img
                              alt="image"
                              src="/assets/img/users/user-5.png"
                              className="rounded-circle"
                              width={35}
                              data-toggle="tooltip"
                            />
                          </td>
                          <td>VIP - Circle</td>
                          <td>24</td>
                          <td>California</td>
                          <td>25/5/2022 - 12:30 PM</td>
                          <td>
                            <div className="dropdown d-inline ml-1">
                              <i
                                className="fas fa-ellipsis-v"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              />
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
                          <td> 1</td>
                          <td>
                            <img
                              alt="image"
                              src="/assets/img/users/user-5.png"
                              className="rounded-circle"
                              width={35}
                              data-toggle="tooltip"
                            />
                          </td>
                          <td>VIP - Circle</td>
                          <td>24</td>
                          <td>California</td>
                          <td>25/5/2022 - 12:30 PM</td>
                          <td>
                            <div className="dropdown d-inline ml-1">
                              <i
                                className="fas fa-ellipsis-v"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              />
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
                          <td> 1</td>
                          <td>
                            <img
                              alt="image"
                              src="/assets/img/users/user-5.png"
                              className="rounded-circle"
                              width={35}
                              data-toggle="tooltip"
                            />
                          </td>
                          <td>VIP - Circle</td>
                          <td>24</td>
                          <td>California</td>
                          <td>25/5/2022 - 12:30 PM</td>
                          <td>
                            <div className="dropdown d-inline ml-1">
                              <i
                                className="fas fa-ellipsis-v"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              />
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
export default Event;
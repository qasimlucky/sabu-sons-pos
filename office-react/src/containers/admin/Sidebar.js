import React,{useState} from "react";
import { Link } from 'react-router-dom';

function Sidebar (){

    const [isActive, setIsActive] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isBill, setIsBill] = useState(false);
    const [isPartner, setIsPartner] = useState(false);
    const [isAgent, setIsAgent] = useState(false);
    const [isSupplier, setIsSupplier] = useState(false);
    const [isPurchase, setIsPurchase] = useState(false);
    const handleClick = event => {
        // 👇️ toggle isActive state on click
        setIsActive(current => !current);
      };

      const handleMe = event => {
        // 👇️ toggle isActive state on click
        setIsEmail(current => !current);
      }
      const handlebillclass = event => {
        // 👇️ toggle isActive state on click
        setIsBill(current => !current);
      }
      const handlepartnerclass = event => {
        // 👇️ toggle isActive state on click
        setIsPartner(current => !current);
      }
      const handleagentclass = event => {
        // 👇️ toggle isActive state on click
        setIsAgent(current => !current);
      }
      const handlesupplierclass = event => {
        // 👇️ toggle isActive state on click
        setIsSupplier(current => !current);
      }
      const handlepurchaseclass = event => {
        // 👇️ toggle isActive state on click
        setIsPurchase(current => !current);
      }

      let onclickclass = isActive ? ' active' :null;
      let  emailclass=  isEmail? ' active' :null;
      let  billclass=  isBill? ' active' :null;
      let  partnerclass=  isPartner? ' active' :null;
      let  agentclass=  isAgent? ' active' :null;
      let  supplierclass=  isSupplier? ' active' :null;
      let  purchaseclass=  isPurchase? ' active' :null;

       return (
        <div class="main-sidebar sidebar-style-2">
                <aside id="sidebar-wrapper">
                <div class="sidebar-brand">
                    <a > <img alt="image" src="assets/img/logo.png" class="header-logo" /> <span
                        class="logo-name">Sabu-sons</span>
                    </a>
                </div>
                <ul class="sidebar-menu">
                    <li class="menu-header">Main</li>
                    <li class="dropdown">
                    <a  onClick={() => {window.location.href="/dashboard"}} class="nav-link"><i data-feather="monitor"></i><span>Dashboard</span></a>
                    </li>
                    <li class="dropdown">
                        <Link to = '/pos'  class="nav-link"><i data-feather="monitor"></i><span>Point Of Sale</span></Link>
                    </li>
                    <li className={`dropdown${onclickclass}`}>
                    <a href="#" class="menu-toggle nav-link has-dropdown" onClick={handleClick}><i data-feather="command"></i><span>Dealers</span></a>
                    <ul class="dropdown-menu">
                        <li><Link class="nav-link" to="/adddealers">Add Dealers</Link></li>
                        <li><Link class="nav-link" to="/alldealer">Edit Dealers</Link></li>
                    </ul>
                    </li>
                    <li className={`dropdown${emailclass}`}>
                    <a href="#" class="menu-toggle nav-link has-dropdown" onClick={handleMe}><i data-feather="mail"></i><span>Stock</span></a>
                    <ul class="dropdown-menu">
                        <li><Link class="nav-link" to="/addstock">Add Stock</Link></li>
                        <li><Link class="nav-link" to="/allstock">List & Edit Stock</Link></li>
                        <li><Link class="nav-link" to="/categories"> All Stock Categories</Link></li>
                        <li><Link class="nav-link" to="/addcategories">Add Stock Categories</Link></li>
                        
                    </ul>
                    </li>
                    <li className={`dropdown${billclass}`}>
                    <a href="#" class="menu-toggle nav-link has-dropdown" onClick={handlebillclass}><i data-feather="mail"></i><span>Orders</span></a>
                    <ul class="dropdown-menu">
                        <li><Link class="nav-link" to="/allbill">All Orders</Link></li>
                        <li><Link class="nav-link" to="/allstock">Delete Orders</Link></li>
                    </ul>
                    </li>
                    <li className={`dropdown${partnerclass}`}>
                    <a href="#" class="menu-toggle nav-link has-dropdown" onClick={handlepartnerclass}><i data-feather="mail"></i><span>Partners</span></a>
                    <ul class="dropdown-menu">
                        <li><Link class="nav-link" to="/partner">All Partners</Link></li>
                        <li><Link class="nav-link" to="/addpartner">Add Partner</Link></li>
                    </ul>
                    </li>
                    <li className={`dropdown${agentclass}`}>
                    <a href="#" class="menu-toggle nav-link has-dropdown" onClick={handleagentclass}><i data-feather="mail"></i><span>Agents</span></a>
                    <ul class="dropdown-menu">
                        <li><Link class="nav-link" to="/allagent">All Agents</Link></li>
                        <li><Link class="nav-link" to="/addagent">Add Agents</Link></li>
                    </ul>
                    </li>
                    <li className={`dropdown${supplierclass}`}>
                    <a href="#" class="menu-toggle nav-link has-dropdown" onClick={handlesupplierclass}><i data-feather="mail"></i><span>Supplier</span></a>
                    <ul class="dropdown-menu">
                        <li><Link class="nav-link" to="/allsupplier">All Supplier</Link></li>
                        <li><Link class="nav-link" to="/addsupplier">Add Supplier</Link></li>
                    </ul>
                    </li>
                    <li className={`dropdown${purchaseclass}`}>
                    <a href="#" class="menu-toggle nav-link has-dropdown" onClick={handlepurchaseclass}><i data-feather="mail"></i><span>Purchases</span></a>
                    <ul class="dropdown-menu">
                        <li><Link class="nav-link" to="/allpurchase">All Supplier</Link></li>
                        <li><Link class="nav-link" to="/addpurchase">Add purchase</Link></li>
                    </ul>
                    </li>
                    <li class="dropdown">
                    <Link onClick={() => {window.location.href="/dashboard"}} class="nav-link"><i data-feather="command"></i><span>Reports</span></Link>
                    </li>
                    {/* <li class="dropdown">
                    <Link to="/addmovies" class="nav-link"><i data--="mail"></i><span>Movies</span></Link>
                    </li> */}
                    <li class="dropdown">
                    <Link onClick={() => {window.location.href="/dashboard"}} class="nav-link"><i data-feather="copy"></i><span>Setting</span></Link>    
                    </li>
                    
                </ul>
                </aside>
            </div>
       );
}

export default Sidebar;
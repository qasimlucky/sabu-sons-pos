import { Route, Routes } from 'react-router-dom';
import Home from './containers/admin/index'
import Partner from './containers/admin/partners/partner-list';
import Event from './containers/admin/event';
import Adduser from './containers/admin/addUserForm';
import Subscription from './containers/admin/subscriptions';
import Notification from './containers/admin/notifications';
import AddPartner from './containers/admin/partners/add-partner'
import PartnerTransaction from './containers/admin/partners/partner-transaction';
// 
import AddDealer from './containers/admin/dealers/add-dealers';
import AddStock from './containers/admin/stock/add-stock';
import DealerList from './containers/admin/dealers/dealers-list';
import EditDealerForm from './containers/admin/dealers/edit-dealer-form';
import StockList from './containers/admin/stock/stock-list';
import EditStockForm from './containers/admin/stock/edit-stock-form';
import AddCategories from './containers/admin/stock/add-categories';
import CategoriesList from './containers/admin/stock/categories-list'
import PointOfSale from './containers/admin/pos'
import CalculatorCheck from './containers/admin/calculator';
import AllBill from './containers/admin/bills/bills-list';
import ShowBill from './containers/admin/bills/show-bill';
import AddAgent from './containers/admin/agents/add-agent';
import AgentList from './containers/admin/agents/agent-list';
import EditAgentForm from './containers/admin/agents/edit-agent-form';
import AgentTransaction from './containers/admin/agents/agent-transaction';
import AddSupplier from './containers/admin/supplier/add-supplier';
import SupplierList from './containers/admin/supplier/supplier-list';
import EditSupplierForm from './containers/admin/supplier/edit-supplier-from';
import AddPurchase from './containers/admin/purchase/add-purchase';
import SearchBar from './containers/admin/search-bar';
function App() {
  return (
    <main>
            <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/dashboard" exact element={<Home/>}/>
                <Route path="/partner" exact element={<Partner/>}/>
                <Route path="/event" exact element={<Event/>}/>
                <Route path="/subscription" exact element={<Subscription/>}/>
                <Route path="/notification" exact element={<Notification/>}/>
                <Route path="/adduser" exact element={<Adduser/>}/>
                <Route path="/adddealers" exact element={<AddDealer/>}/>
                <Route path="/addstock" exact element={<AddStock/>}/>
                <Route path="/alldealer" exact element={<DealerList/>}/>
                <Route path="/editdealerform" exact element={<EditDealerForm/>}/>
                <Route path="/allstock" exact element={<StockList/>}/>
                <Route path="/editstock" exact element={<EditStockForm/>}/>
                <Route path="/pos" exact element={<PointOfSale/>}/>
                <Route path="/cal" exact element={<CalculatorCheck/>}/>
                <Route path="/allbill" exact element={<AllBill/>}/>
                <Route path="/bill" exact element={<ShowBill/>}/>
                <Route path="/addpartner" exact element={<AddPartner/>}/>
                <Route path="/transaction" exact element={<PartnerTransaction/>}/>
                <Route path="/addcategories" exact element={<AddCategories/>}/>
                <Route path="/categories" exact element={<CategoriesList/>}/>
                <Route path="/addagent" exact element={<AddAgent/>}/>
                <Route path="/allagent" exact element={<AgentList/>}/>
                <Route path="/agenttransaction" exact element={<AgentTransaction/>}/>
                <Route path="/addsupplier" exact element={<AddSupplier/>}/>
                <Route path="/allsupplier" exact element={<SupplierList/>}/>
                <Route path="/editsupplier" exact element={<EditSupplierForm/>}/>
                <Route path="/editagent" exact element={<EditAgentForm/>}/>
                <Route path="/addpurchase" exact element={<AddPurchase/>}/>
                <Route path="/search" exact element={<SearchBar/>}/>
                    
            </Routes>
            
                
        </main>
  );
}

export default App;

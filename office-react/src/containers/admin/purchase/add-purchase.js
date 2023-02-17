import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import axios from "axios";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import DatePicker from 'react-date-picker';
import { BsXLg } from "react-icons/bs";



function AddPurchase(props) {
    const [value, onChange] = useState(new Date());
    const [supplierdata, setSupplierData] = useState([{}])
    const [stockdata, setStockData] = useState([{}])
    const [searchvalue, setSerachValue] = useState("");
    const [selectedproduct,setSelectedProduct] = useState([]);
    const [totalpurchaseamount,setTotalPurchaseAmount] = useState();
    const [numberofitem,setNumberOfItem] = useState();
    const [supplier,setSupplierName] = useState();
    const [purchasestatus,setPurchaseStatus] = useState();
    const [refnumber,setBillReferenceNumber] = useState();
    
    

    
function handleReferenceNumber(e){
    console.log(e.target.value)
    setBillReferenceNumber(e.target.value)
}
function submit(){
    console.log("this is submit")
}
useEffect(() => {
    axios.get("http://localhost:8000/supplier/get").then(Response =>{
      console.log(Response.data)
      setSupplierData(Response.data)
    }).catch(err =>{
      console.log(err)
    })
},[]);

useEffect(() => {
    axios.get("http://localhost:8000/stock/get").then(Response =>{
      console.log(Response.data)
      setStockData(Response.data)
    }).catch(err =>{
      console.log(err)
    })
},[]);

useEffect(() => { // this hook will get called every time myArr has changed
  // perform some action every time myArr is updated
  AddPurchaseAmount()
  NumberOfItems()
}, [selectedproduct]) 

 const onChangeValue = (event) => {
  setSerachValue(event.target.value);
};

const onSearch = (searchTerm) => {
  console.log("search ", searchTerm);
  console.log("addsearch ", selectedproduct);
    var  objIndex = selectedproduct.findIndex((obj => obj.stock_id == searchTerm.stock_id));
    //console.log(partnerDetails)
    if(objIndex !== -1){ 
      console.log('already exist')
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Already selected can't select again`,
      })
    }else{
      selectedproduct.push(searchTerm)
      setSelectedProduct([...selectedproduct])
    }
 
}; 

function QuantityChange(e,product){
  var  objIndex = selectedproduct.findIndex((obj => obj.stock_id == product.stock_id));
  selectedproduct[objIndex].quantity = e.target.value;
  selectedproduct[objIndex].subtotal =(parseInt(selectedproduct[objIndex].purchase_price)*e.target.value) ;
  setSelectedProduct([...selectedproduct])
 console.log(selectedproduct)

}
function PurchasePriceChange(e,product){
  var  objIndex = selectedproduct.findIndex((obj => obj.stock_id == product.stock_id));
  selectedproduct[objIndex].purchase_price = e.target.value;
  selectedproduct[objIndex].subtotal =(parseInt(selectedproduct[objIndex].quantity)*e.target.value) ;
  setSelectedProduct([...selectedproduct])
 console.log(selectedproduct)

}
function SalePriceChange(e,product){
  var  objIndex = selectedproduct.findIndex((obj => obj.stock_id == product.stock_id));
  selectedproduct[objIndex].sale_price = e.target.value;
  setSelectedProduct([...selectedproduct])
 console.log(selectedproduct)

}
function WholeSalePriceChange(e,product){
  var  objIndex = selectedproduct.findIndex((obj => obj.stock_id == product.stock_id));
  selectedproduct[objIndex].whole_sale_price = e.target.value;
  setSelectedProduct([...selectedproduct])
 console.log(selectedproduct)

}

function RemoveFromSelected(product){
  setSelectedProduct(selectedproduct.filter(emp => emp.stock_id !== product.stock_id))
}

function AddPurchaseAmount(){
  var AllSubTotal= 0;
  if(selectedproduct.length >=1){
      for (let i = 0, len = selectedproduct.length; i < len; i++) {
        if(selectedproduct[i].subtotal){
          AllSubTotal = AllSubTotal+parseInt(selectedproduct[i].subtotal)
        }
          if(i == (len-1)){
              setTotalPurchaseAmount(AllSubTotal)
          }
        }
  }else{
    setTotalPurchaseAmount(AllSubTotal)
  }    
}

function NumberOfItems(){
  var NOBItem =selectedproduct.length
  setNumberOfItem(NOBItem)
}

function handleSupplier(e){
  setSupplierName(e.target.value)
}
function handlePurchaseStatus(e){
  setPurchaseStatus(e.target.value)
}
async function PurchaseAdd(){
  try{
      var PurchaseObject = {
          stock_item : selectedproduct,
          purchase_amount: totalpurchaseamount,
          total_stock_item:numberofitem,
          supplier:supplier,
          purchase_status:purchasestatus,
          reference_number:refnumber,
          purchase_date:value
      }
      console.log(PurchaseObject)
      /* savebill.push(billObject)
      console.log("this is save bill")
      console.log(savebill) */
      
       axios
      .post("/purchase/add", PurchaseObject)
      .then(res => {
        console.log(res.data)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Purchase has been saved',
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
  }catch{
      console.log("something went wrong")
  }

  }

  return (
    <>
      <Navbar />
      <Sidebar />

      <div id="app" style={{ marginTop: 150 }}>
        <section class="section">
          <div class="container" style={{maxWidth:"1300px", paddingLeft:"0px"}}>
            <div class="row">
              <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-11 offset-xl-2">
                <div class="card card-primary">
                  <div class="card-header">
                    <h4>Add Purchase</h4>
                  </div>
                  <div class="card-body">
                    {/* <form  method="HTTP_METHOD" enctype="multipart/form-data"> */}

                      <div class="row">
                        <div class="form-group col-3">
                            <label for="">Supplier</label>
                            <div>
                                <input  onChange={(e) => handleSupplier(e)}  list="supplier" name="supplier" id="categories" placeholder="All supplier" style={{height:"40px" ,width:"100%", lineHeight:"initial"}}/>
                                    <datalist  id="supplier">
                                        <option>supplier</option>
                                        {supplierdata && supplierdata.map(Details => (
                                        <option>{Details.first_name}</option>
                                        ))} 
                                    </datalist>
                            </div>
                        </div>
                        <div class="form-group col-3">
                            <label for="">Purchase Status </label>
                            <div>
                                <input  onChange={(e) => handlePurchaseStatus(e)}  list="purchase_status" name="purchase_status" id="categories" placeholder="select status" style={{height:"40px" ,width:"100%", lineHeight:"initial"}}/>
                                    <datalist  id="purchase_status">
                                        <option>ordered</option>
                                        <option>pending</option>
                                        <option>recivied</option>

                                    {/* {categoryname && categoryname.map(Details => (
                                    <option>{Details.categories}</option>
                                    ))} */}
                                    </datalist>
                            </div>
                        </div>
                        <div class="form-group col-3">
                          <label for="">Purchase Date</label>
                          <DatePicker onChange={onChange} value={value} />
                        </div>
                        <div class="form-group col-3">
                          <label for="">Reference Number</label>
                          <input onChange={(e) => handleReferenceNumber(e)} id="reference_number" type="text" class="form-control"  name="reference_number" placeholder="e.g 0321-7171898" style={{border:"1px solid black", height:"40px"}}  />
                        </div>


                      </div>
                      <div class="row">
                        {/* <div class="form-group col-4">
                        <label>Select Product</label>
                        <div>
                            <input   onChange={(e) => handleStock(e)}   list="stock_item" name="stock_item"  placeholder="All Stock" style={{height:"40px" ,width:"100%", lineHeight:"initial"}}/>
                            <datalist  id="stock_item">
                            {stockdata && stockdata.map(stockDetails => (
                            <option value={stockDetails.stock_id} >{stockDetails.book_title}</option>
                            ))} 
                            </datalist>

                            </div>
                        </div> */}
                        <div class="form-group col-3">
                          <label for="">Select Product</label>
                          <div className="App">
                            <div className="search-container">
                              <div className="search-inner">
                                <input type="text" value={searchvalue} onChange={onChangeValue} style={{height:"40px" ,width:"100%", lineHeight:"initial"}}/>
                                {/* <button onClick={() => onSearch(searchvalue)} style={{height:"40px" ,width:"25%", lineHeight:"initial", marginLeft:"2px"}}> Search </button> */}
                              </div>
                              <div className="dropdown">
                                {stockdata &&  stockdata
                                  .filter((item) => {
                                      if(searchvalue){
                                          const searchTerm = searchvalue.toLowerCase();
                                          const fullName = item.book_title.toLowerCase();
                                          return (
                                              searchTerm &&
                                              fullName.startsWith(searchTerm) &&
                                              fullName !== searchTerm
                                            );
                                      }

                                  })
                                  .slice(0, 10) 
                                  .map((item) => (
                                    <div
                                      onClick={() => onSearch(item)}
                                      className="dropdown-row"
                                      key={item.book_title}
                                    >
                                      {item.book_title}
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form-group col-2">
                            <label>If new product</label>
                            <Link to="/addstock" className="btn btn-success ">
                                Add Product
                            </Link>
                        </div>
                      </div>
                      <div style={{border:"1px solid black"}}></div>
                      <div style={{marginTop:'20px',display:"flex", flexWrap:"nowrap",width:"100%", height:"60px"}}>
                        <div  style={{border:"1px solid red", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"7%"}}>Sr#
                        </div>
                        <div style={{border:"1px solid red", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"21%"}}  >
                            Product Name
                        </div>
                        <div style={{border:"1px solid red", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"13%"}} >
                          Quantity
                        </div>
                        <div style={{border:"1px solid red", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"13%"}}>
                            Purchase Price
                        </div>
                        <div style={{border:"1px solid red", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"13%"}}>
                            Whole-Sale Price
                        </div>
                        <div style={{border:"1px solid red", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"13%"}}>
                            Sale Price
                        </div>
                        <div style={{border:"1px solid red", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"13%"}}>
                            sub total
                        </div>
                        <div  style={{border:"1px solid red", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"7%"}}>
                          Action
                        </div>
                      </div>

                      {/* items in array */}
                      <div className="puschase-stock-list" style={{marginTop:'5px',width:"100%", height:"200px", overflow:"scroll"}}>
                      {selectedproduct && selectedproduct.map(product => ( 
                        <div style={{marginTop:"2px",display:"flex", width:"100%"}}>
                            <div  style={{border:"1px solid green", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"7%" , height:'60px'}}>
                                Sr#
                            </div>
                            <div style={{border:"1px solid green", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"21%", height:'60px'}}  >
                                {product.book_title}
                            </div>
                            <div style={{border:"1px solid green", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"13%", height:'60px'}} >
                                <input style={{height:"35px"}} onChange = {(e) =>QuantityChange(e,product )}  type="text" class="form-control"   placeholder="e.g Raza"  />
                            </div>
                            <div style={{border:"1px solid green", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"13%", height:'60px'}}>
                                <input style={{height:"35px"}} onChange = {(e) =>PurchasePriceChange(e,product )} defaultValue={product.purchase_price} type="text" class="form-control"  placeholder="e.g Raza"  />
                            </div>
                            <div style={{border:"1px solid green", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"13%", height:'60px'}}>
                                <input style={{height:"35px"}} onChange = {(e) =>WholeSalePriceChange(e,product )} defaultValue={product.whole_sale_price} id="last_name" type="text" class="form-control" name="last_name" placeholder="e.g Raza"  />
                            </div>
                            <div style={{border:"1px solid green", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"13%", height:'60px'}}>
                                <input style={{height:"35px"}} onChange = {(e) =>SalePriceChange(e,product )} defaultValue={product.sale_price} id="last_name" type="text" class="form-control" name="last_name" placeholder="e.g Raza"  />
                            </div>
                            <div style={{border:"1px solid green", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"13%", height:'60px'}}>
                                {product.subtotal}
                            </div>
                            <div  style={{border:"1px solid green", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"7%" , height:'60px'}}>
                                <BsXLg style={{color:"red"}} onClick = {() =>RemoveFromSelected(product)}/>
                            </div>
                        </div>
                      ))}
                       {/*  <div style={{marginTop:"2px",display:"flex", width:"100%"}}>
                            <div  style={{border:"1px solid green", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"7%" , height:'60px'}}>
                                Sr#
                            </div>
                            <div style={{border:"1px solid green", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"21%", height:'60px'}}  >
                                Product Name
                            </div>
                            <div style={{border:"1px solid green", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"13%", height:'60px'}} >
                                <input style={{height:"35px"}} id="last_name" type="text" class="form-control" name="last_name" placeholder="e.g Raza"  />
                            </div>
                            <div style={{border:"1px solid green", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"13%", height:'60px'}}>
                                <input style={{height:"35px"}} id="last_name" type="text" class="form-control" name="last_name" placeholder="e.g Raza"  />
                            </div>
                            <div style={{border:"1px solid green", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"13%", height:'60px'}}>
                                <input style={{height:"35px"}} id="last_name" type="text" class="form-control" name="last_name" placeholder="e.g Raza"  />
                            </div>
                            <div style={{border:"1px solid green", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"13%", height:'60px'}}>
                                <input style={{height:"35px"}} id="last_name" type="text" class="form-control" name="last_name" placeholder="e.g Raza"  />
                            </div>
                            <div style={{border:"1px solid green", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"13%", height:'60px'}}>
                                sub total
                            </div>
                        </div>
                        <div style={{marginTop:"2px",display:"flex", width:"100%"}}>
                            <div  style={{border:"1px solid green", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"7%" , height:'60px'}}>
                                Sr#
                            </div>
                            <div style={{border:"1px solid green", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"23%", height:'60px'}}  >
                                Product Name
                            </div>
                            <div style={{border:"1px solid green", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"14%", height:'60px'}} >
                                <input style={{height:"35px"}} id="last_name" type="text" class="form-control" name="last_name" placeholder="e.g Raza"  />
                            </div>
                            <div style={{border:"1px solid green", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"14%", height:'60px'}}>
                                <input style={{height:"35px"}} id="last_name" type="text" class="form-control" name="last_name" placeholder="e.g Raza"  />
                            </div>
                            <div style={{border:"1px solid green", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"14%", height:'60px'}}>
                                <input style={{height:"35px"}} id="last_name" type="text" class="form-control" name="last_name" placeholder="e.g Raza"  />
                            </div>
                            <div style={{border:"1px solid green", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"14%", height:'60px'}}>
                                <input style={{height:"35px"}} id="last_name" type="text" class="form-control" name="last_name" placeholder="e.g Raza"  />
                            </div>
                            <div style={{border:"1px solid green", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"14%", height:'60px'}}>
                                sub total
                            </div>
                        </div>
                        <div style={{marginTop:"2px",display:"flex", width:"100%"}}>
                            <div  style={{border:"1px solid green", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"7%" , height:'60px'}}>
                                Sr#
                            </div>
                            <div style={{border:"1px solid green", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"23%", height:'60px'}}  >
                                Product Name
                            </div>
                            <div style={{border:"1px solid green", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"14%", height:'60px'}} >
                                <input style={{height:"35px"}} id="last_name" type="text" class="form-control" name="last_name" placeholder="e.g Raza"  />
                            </div>
                            <div style={{border:"1px solid green", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"14%", height:'60px'}}>
                                <input style={{height:"35px"}} id="last_name" type="text" class="form-control" name="last_name" placeholder="e.g Raza"  />
                            </div>
                            <div style={{border:"1px solid green", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"14%", height:'60px'}}>
                                <input style={{height:"35px"}} id="last_name" type="text" class="form-control" name="last_name" placeholder="e.g Raza"  />
                            </div>
                            <div style={{border:"1px solid green", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"14%", height:'60px'}}>
                                <input style={{height:"35px"}} id="last_name" type="text" class="form-control" name="last_name" placeholder="e.g Raza"  />
                            </div>
                            <div style={{border:"1px solid green", display: "flex",justifyContent: "center", alignItems:"center", padding:"10px", width:"14%", height:'60px'}}>
                                sub total
                            </div>
                        </div> */}

                      </div>
                      <div class="row">
                      <div class="form-group col-4" style={{display:"flex",marginTop:"15px"}}>
                        <div>Number Items:</div>
                        <div style={{marginLeft:"10px"}}>{numberofitem}</div>
                      </div>
                      <div class="form-group col-2" style={{display:"flex",marginTop:"15px"}}>
                        <div >Net Total Amount:</div>
                        <div style={{marginLeft:"10px"}}>{totalpurchaseamount}</div>
                      </div>
                      <div class="form-group col-2" ></div>
                        <div class="form-group col-4">
                          <button onClick = {() =>PurchaseAdd()}  class="btn btn-success btn-lg btn-block" style={{marginTop:"15px"}}>
                            Add Purchase
                          </button>
                        </div>
                      </div>
                    {/* </form> */}
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


export default AddPurchase;
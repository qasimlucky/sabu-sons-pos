import React, { useState,useEffect } from "react";
import {useLocation,useNavigate} from 'react-router-dom';
import axios from "axios";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { BsFillTrashFill } from "react-icons/bs";

function EditStockForm(props) {
    let navigate = useNavigate();
    const MySwal = withReactContent(Swal)
    const [stockcategories, setStockCategories] = useState([{}])
    const [thumbnailfile, setThumbnailFile] = useState();
    const [data, setData] = useState({})
    const [isshow, setIsShow] = useState(true)
    const [dbpartner, setDbPartner] = useState()
    const [stockpartner, setStockPartner] = useState([])
    const [ispartner, setIsPartner] = useState(false)

    function ChangeMe(){
      setIsShow(false)
    }
    function ChangeAgain(){
      setIsShow(true)
    }

  useEffect(() => {
    axios.get("/stock/get/categories").then(Response =>{
      console.log(Response.data)
      setStockCategories(Response.data)
    }).catch(err =>{
      console.log(err)
    })
    },[]);

    useEffect(() => {
      axios.get("/partner/get").then(Response =>{
        console.log(Response.data)
        setDbPartner(Response.data)
      }).catch(err =>{
        console.log(err)
      })
      },[]);

  function handle(e) {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    newdata["stock_id"] = stockData.stock_id
    setData(newdata)
    console.log(data)
  }
  const url = "/stock/edit"

  function submit(e){
    //console.log(data)
    if(ispartner){
      var submitData = {
        ...data,
        "partner" :JSON.stringify(stockpartner)
      }

    }else{
      var submitData = {
        ...data
      }
    }

    console.log(submitData)
      e.preventDefault();
      axios
      .post(url,submitData, {
                        
        headers: {
           "Content-Type": "multipart/form-data",
       }
      })
      .then(res =>{
        Swal.fire({
          icon: 'success',
          title: 'Congratulations',
          text: 'Stock Updated!!!!',
        })
        console.log(res.data)
      }).catch(err =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
          console.log(err)
        })

} 
  const location = useLocation();
  // console.log(location.state.sendData) 
    const stockData = location.state.sendData
    // console.log("this is stockData")
    // console.log(stockData)



    function partnerCheckbox(partnerDetails){
      console.log("this is new partner")
      var  objIndex = stockpartner.findIndex((obj => obj.partner_id == partnerDetails.partner_id));
      //console.log(partnerDetails)
      if(objIndex !== -1){ 
        console.log('already exist')
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Already selected can't select again`,
        })
  
      }else{
        stockpartner.push(partnerDetails)
        console.log(stockpartner)
        setStockPartner([...stockpartner])
      }
  
    }
  
    function DeleteFromArr(partnerDetails){
      setStockPartner(stockpartner.filter(emp => emp.partner_id !== partnerDetails.partner_id))
    }
  
  
    function handlePercentage(e,partnerDetails){
      var  objIndex = stockpartner.findIndex((obj => obj.partner_id == partnerDetails.partner_id));
      stockpartner[objIndex].percentage = e.target.value;
      setIsPartner(true)
      setStockPartner([...stockpartner])
      const newdata = { ...data }
      newdata["stock_id"] = stockData.stock_id
      setData(newdata)
      console.log("this is changed array")
      console.log(stockpartner)
    }
    async function StockImage (e){
      const newdata = {...data}
    const file = e.target.files[0]
    newdata[e.target.id] = e.target.files[0]
    setThumbnailFile(URL.createObjectURL(e.target.files[0]));
    newdata["stock_id"] = stockData.stock_id;
    setData(newdata)
    console.log(data)    
    }
  return (
    <>
    
    <Navbar />
    <Sidebar />
<div id="app" style={{marginTop : 150}}>
    <section class="section">
    {isshow && (
      <div class="container mt-10">
        <div class="row">
          <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-11 offset-xl-2">
            <div class="card card-primary">
              <div class="card-header">
                <h4>Edit Stock</h4>
              </div>
              <div class="card-body">
                <form  action="/web/sales/update"  onSubmit = {(e) =>submit(e)} method="HTTP_METHOD" enctype="multipart/form-data">
                 

                  <label  className="badge badge-primary badge-shadow" style={{padding:"8px"}}>Basic Details</label>
                  <div class="row">
                    <div class="form-group col-3">
                      <label for="">Book Title</label>
                      <input onChange = {(e) =>handle(e)} id="book_title" type="text" class="form-control" name="book_title" placeholder="Book Title"  defaultValue={stockData.book_title}/>
                    </div>
                    <div class="form-group col-3">
                          <label for="">ISBN</label>
                          <input onChange = {(e) =>handle(e)} id="isbn" type="text" class="form-control" name="isbn" placeholder="Book Title"  />
                        </div>
                        <div class="form-group col-3">
                          <label for="">Publisher Name</label>
                          <input onChange = {(e) =>handle(e)} id="purchase_price" type="text" class="form-control" name="purchase_price" placeholder="Book Title"  />
                        </div>
                    <div class="form-group col-3">
                      <label for="">Quantity</label>
                      <input onChange = {(e) =>handle(e)} id="quantity" type="text" class="form-control" name="quantity" placeholder="Quantity" defaultValue={stockData.quantity}/>
                    </div>
                  </div>
                  <label  className="badge badge-primary badge-shadow" style={{padding:"8px"}}>Price Info</label>
                  <div class="row">
                        <div class="form-group col-4">
                            <label for="">purchase price</label>
                            <input onChange = {(e) =>handle(e)}  id="purchase_price" type="text" class="form-control" name="purchase_price" placeholder="Sale Price" defaultValue={stockData.purchase_price}/>
                        </div>
                        <div class="form-group col-4">
                            <label for="">Whole Sale Price</label>
                            <input onChange = {(e) =>handle(e)} id="whole_sale_price" type="text" class="form-control" name="whole_sale_price"  placeholder="Whole Sale Price" defaultValue={stockData.whole_sale_price}/>
                        </div>
                        <div class="form-group col-4">
                            <label for="">Sale Price</label>
                            <input onChange = {(e) =>handle(e)}  id="sale_price" type="text" class="form-control" name="sale_price" placeholder="Sale Price" defaultValue={stockData.sale_price}/>
                        </div>  
                      </div>
                  <label  className="badge badge-primary badge-shadow" style={{padding:"8px"}}>Book Info</label>
                  <div class="row">
                        <div class="form-group col-3">
                          <label>Auther</label>
                          <input onChange = {(e) =>handle(e)} id="auther" type="text" class="form-control" name="auther" placeholder="auther" defaultValue={stockData.auther}/>
                        </div>
                        <div class="form-group col-3">
                          <label for="">Description</label>
                          <input onChange = {(e) =>handle(e)}  id="description" type="text" class="form-control" name="description" placeholder="Description" defaultValue={stockData.description}/>
                        </div>
                        <div class="form-group col-3">
                          <label for="">Record Level</label>
                          <input onChange = {(e) =>handle(e)}  id="record_level" type="text" class="form-control" name="record_level" placeholder="any number" defaultValue={stockData.record_level}/>
                        </div>
                        <div class="form-group col-3">
                        <label for="">Catagories</label>
                          <div style={{fontSize:"12px", }}> 
                                  <input onChange={(e) => handle(e)} list="data" name="categories" id="categories" placeholder="All Categories" style={{height:"40px" , width:'100%',lineHeight:"initial" ,border:"lightgray 1px solid"}}/>
                                      <datalist  id="data">
                                      {stockcategories && stockcategories.map(categoriesDetails => (
                                      <option>{categoriesDetails.categories_title}</option>
                                      ))}
                                      </datalist>
                            </div>
                        </div>
                      </div>
                  
                      <div class="row">
                      <div class="form-group col-4"></div>
                        <div class="form-group col-4">
                            <button onClick={(e) =>ChangeMe(e)}  class="btn btn-success btn-lg btn-block" style={{marginTop:"15px"}}>
                              Next
                            </button>
                        </div>    
                      </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
      {!isshow && (
              <div class="container mt-10">
                <div class="row">
                  <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-11 offset-xl-2">
                    <div class="card card-primary">
                      <div class="card-header">
                        <h4>Add Stock</h4>
                      </div>
                      <div class="card-body">

                        <div class="row">
                          <div  class="form-group col-7">
                            <div class="row">
                            {/* <div class="form-group col-12" style={{height:"40px", fontSize:"12px"}}>
                                        <div  style={{ width:"100%", height:"40px", display:"flex", }}>
                                            <input onChange={(partnerDetails) => stockPartner(partnerDetails)} list="data" name="partner" id="partner" placeholder="All Partners" style={{height:"40px" , width:'76%', lineHeight:"initial"}}/>
                                                <datalist  id="data">
                                                {partner && partner.map(partnerDetails => (
                                                <option>{partnerDetails.first_name}</option>
                                                ))}
                                                </datalist>
                                            <div  style={{height:"40px" , width:'23%', lineHeight:"initial", display:"flex" , alignItems:'center', justifyContent:"center", border:"1px solid"}}>Add</div>
                                        </div>
                                </div>  */}

                                               
                                <div class="form-group col-6 hide-scrollbar" style={{height:"400px", overflow:"scroll", WebkitScrollSnapType:"none",overflowX: "hidden"}}>
                                    <label className="badge badge-primary badge-shadow" style={{color:"white", padding:"9px"}} >Partners</label>
                                    {dbpartner && dbpartner.map(partnerDetails => (
                                      <div class="row">
                                        
                                        <div class="form-group col-6">
                                        {partnerDetails.first_name}
                                        </div>
                                        <div class="form-group col-3">
                                        {partnerDetails.percentage}%
                                        </div>
                                        <div class="form-group col-3">
                                          <button onClick={() =>partnerCheckbox(partnerDetails)} style={{padding:"7px", fontSize:"8px", }} class="btn btn-success btn-lg btn-block" >Add</button>
                                        </div>
                                        
                                      </div>
                                      ))}
                                </div>
                                
                                  <div class="form-group col-5 hide-scrollbar" style={{height:"400px", overflow:"scroll", WebkitScrollSnapType:"none",overflowX: "hidden"}}>
                                  <label className="badge badge-primary badge-shadow" style={{color:"white",padding:"8px"}} >Selected Partners</label>
                                  {stockpartner && stockpartner.map(partnerDetails => (
                                    <div class="row">
                                     
                                      <div class="form-group col-7">
                                        <BsFillTrashFill onClick={() =>DeleteFromArr(partnerDetails)} style={{fontSize:"18px",color:"red", marginRight:'3px'}}/>
                                        <label for="">{partnerDetails.first_name}</label>
                                      </div>
                                      <div class="form-group col-5">
                                        <input style={{height:'20px'}} onChange = {(e) =>handlePercentage(e,partnerDetails )} id="percentage" type="text" class="form-control" name="percentage"  placeholder="%"/>
                                      </div>
                                    </div>
                                    ))}
                                    

                                  </div>
                                  
                            </div>
                          </div>
                          
                          <div class="form-group col-5">
                            <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">Thumbnail</label>
                         
                                <div class="col-sm-12 col-md-7">
                                    <div id="image-preview" class="image-preview">
                                      <div class="custom-file">
                                        <label  for="customFile">Stock Image</label>
                                        <img src={thumbnailfile} />
                                        <input type="file" onChange = {(e) =>StockImage(e)}  name="file"  class="custom-file-input form-control" id="file"/>
                                      </div>
                                    </div>
                                    
                                </div>
                          </div>
                              
                        </div>
                        
                          <div class="row">
                          <div class="form-group col-2">
                          <button onClick={(e) =>ChangeAgain(e)} class="btn btn-primary btn-lg btn-block" style={{marginTop:"15px"}}>
                                  Back
                          </button>
                          </div>
                          
                          <div class="form-group col-2"></div>
                            <div class="form-group col-4">
                                <button onClick={(e) =>submit(e)}  class="btn btn-success btn-lg btn-block" style={{marginTop:"15px"}}>
                                  Add Stock
                                </button>
                            </div>
                         
                          </div>
                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          )}
    </section>
  </div>

    </>
  );
}


export default EditStockForm;
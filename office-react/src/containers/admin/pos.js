import React,{ useEffect, useState } from "react";
import  { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import {useLocation} from 'react-router-dom';
import axios from "axios";
import Calculator from "awesome-react-calculator";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { BsDashSquareFill } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";
import { BsCurrencyDollar } from "react-icons/bs";
import { BsCalculator } from "react-icons/bs";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

function PointOfSale(props) {
    const [data, setData] = useState([{}])
    const MySwal = withReactContent(Swal)
    const [authername, setAutherName] = useState([{}])
    const [categoryname, setCategoryName] = useState([{}])
    const [customerbill, setCustomerBill] = useState([])
    const [billtotal, setBillTotal] = useState(0)
    const [billdiscount, setBillDiscount] = useState(0)
    const [billtax, setBillTax] = useState(0)
    const [billshipping, setBillShipping] = useState(0)
    const [iscalculator, setIsCalculator] = useState(false)
    const [numberofbillitem, setNumberOfBillItem] = useState(0)
    const [savebill, setSaveBill] = useState([])
    const [isprintbill, setIsPrintBill] = useState(false);
    const [iseditmode, setIsEditMode] = useState(false)
    //Edit bill
      //Edit bill
   /*    const location = useLocation();
      console.log("this is receving")
      console.log(location.state.sendData) 
        const stockData = location.state.sendData;
    useEffect(() => {
        setCustomerBill(stockData.bill_items)
        setIsEditMode(true)
        },[stockData]); */

    //print bill
    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      onAfterPrint: () => {
        // Reset the Promise resolve so we can print again
        setCustomerBill([])
      }
      
    
    });

    // Date Time
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const time = current.toLocaleTimeString();
    
    useEffect(() => {
      axios.get("/stock/get").then(Response =>{
        console.log(Response.data)
        setData(Response.data)
      }).catch(err =>{
        console.log(err)
      })
      },[]);
      //
    function AllStock(){
        axios.get("/stock/get").then(Response =>{
            console.log(Response.data)
            setData(Response.data)
          }).catch(err =>{
            console.log(err)
          })
    }
      // All Auther list name
      useEffect(() => {
        axios.get("/stock/get/authername").then(Response =>{
          console.log(Response.data)
          setAutherName(Response.data)
        }).catch(err =>{
          console.log(err)
        })
        },[]);

        useEffect(() => {
            axios.get("/stock/get/categoryname").then(Response =>{
              console.log(Response.data)
              setCategoryName(Response.data)
            }).catch(err =>{
              console.log(err)
            })
            },[]);

      useEffect(() => { // this hook will get called every time myArr has changed
        // perform some action every time myArr is updated
        TotalBillAmount();
        NumberOfItem();
     }, [customerbill]) 
     
     function handle(e) {
        var authers=e.target.value
        axios
            .post("/stock/get/auther", {auther:authers})
            .then(res => {
              console.log(res.data)
              setData(res.data)
            }).catch(err =>{
                console.log(err)
            })
      }

      function handleCategory(e) {
        var categories=e.target.value
        console.log(e.target.value)
        axios
            .post("/stock/get/categorybook", {categories:categories})
            .then(res => {
              console.log(res.data)
              setData(res.data)
            }).catch(err =>{
                console.log(err)
            })
      }
     //Bill
      function Bill(stockDetails){
       // console.log('this is from bill')
        //var item = customerbill.find(item => item.stock_id == "ss-stock-1");
       var  objIndex = customerbill.findIndex((obj => obj.stock_id == stockDetails.stock_id));
        //console.log(objIndex)
        if(objIndex !== -1){ 
            customerbill[objIndex].sell_quantity = (customerbill[objIndex].sell_quantity+1)
            customerbill[objIndex].sub_total = (customerbill[objIndex].sale_price * (customerbill[objIndex].sell_quantity))
            setCustomerBill([...customerbill])
            /* setCustomerBill([...customerbill], () => {
                
             }) */

        }else{
            stockDetails.sell_quantity = 1;
            stockDetails.bill_item_Price = stockDetails.sale_price;
            stockDetails.sub_total = stockDetails.sale_price;
            customerbill.push(stockDetails)
            setCustomerBill([...customerbill])
        }

    }
    async function DeleteitemFromBill(Bill){
       setCustomerBill(customerbill.filter(emp => emp.stock_id !== Bill.stock_id))
     }
     function DecreaseQuantity(Bill){
        var  objIndex = customerbill.findIndex((obj => obj.stock_id == Bill.stock_id));
        if(customerbill[objIndex].sell_quantity >=2){
            customerbill[objIndex].sell_quantity = (customerbill[objIndex].sell_quantity-1)
            customerbill[objIndex].sub_total = (customerbill[objIndex].sub_total-customerbill[objIndex].sale_price )
            setCustomerBill([...customerbill])
        }else{
            setCustomerBill(customerbill.filter(emp => emp.stock_id !== Bill.stock_id))
        }

     }
     function IncreaseQuantity(Bill){
        var  objIndex = customerbill.findIndex((obj => obj.stock_id == Bill.stock_id));
        customerbill[objIndex].sell_quantity = (customerbill[objIndex].sell_quantity+1)
        customerbill[objIndex].sub_total = (customerbill[objIndex].sale_price * (customerbill[objIndex].sell_quantity))
        setCustomerBill([...customerbill])
     }

     function TotalBillAmount(){
        var AllSubTotal= 0;
        if(customerbill.length >=1){
            for (let i = 0, len = customerbill.length; i < len; i++) {
                AllSubTotal = AllSubTotal+parseInt(customerbill[i].sub_total)
                //console.log(AllSubTotal)
    
                if(i == (len-1)){
                    // console.log("this is total bill")
                    // console.log(AllSubTotal)
                    setBillTotal(AllSubTotal)
                }
              }
        }else{
            setBillTotal(AllSubTotal)
        }
        
          
     }

    function NumberOfItem(){
        console.log(customerbill)
      var NOBItem =customerbill.length
      setNumberOfBillItem(NOBItem)
    }
 async  function AddCash(){
    try{
        setIsPrintBill(true)
        console.log("add cash")
        console.log(customerbill)
        console.log(savebill)
        var billObject = {
            bill_items : customerbill,
            bill_total: billtotal,
            bill_discount:billdiscount,
            bill_tax:billtax,
            bill_shipping:billshipping
        }
        savebill.push(billObject)
        console.log("this is save bill")
        console.log(savebill)
         
        handlePrint()
        
         axios
        .post("/bill/add", billObject)
        .then(res => {
          console.log(res.data)
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Bill has been saved',
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

    function MouseOver(event) {
        event.target.style.background = 'lightgray';
      }

      function MouseOut(event){
        event.target.style.background="";
      }
      function OpenCalculator(){
        if(iscalculator == true){
            setIsCalculator(false)
        }else{
            setIsCalculator(true)
        }
      }
      // Discount calculation

     function handleDiscount(e){
        var AllSubTotal= 0;
        if(customerbill.length >=1){
            for (let i = 0, len = customerbill.length; i < len; i++) {
                AllSubTotal = AllSubTotal+parseInt(customerbill[i].sub_total)
                if(i == (len-1)){
                    setBillTotal(AllSubTotal)
                }
              }
        }else{
            setBillTotal(AllSubTotal)
        }
        var partialValue = e.target.value
        var discountAmount = ((partialValue/100) * AllSubTotal).toFixed(0)
        console.log(discountAmount)
        setBillDiscount(discountAmount)
        var AmountAfterdicount = (parseInt(AllSubTotal)-parseInt(discountAmount)+parseInt(billshipping)+parseFloat(billtax));
        setBillTotal(AmountAfterdicount)

       
      }
     


      // tax calculation
      function handleTax(e){
        var AllSubTotal= 0;
        if(customerbill.length >=1){
            for (let i = 0, len = customerbill.length; i < len; i++) {
                AllSubTotal = AllSubTotal+parseInt(customerbill[i].sub_total)
                if(i == (len-1)){
                    setBillTotal(AllSubTotal)
                }
              }
        }else{
            setBillTotal(AllSubTotal)
        }

        var partialValue = e.target.value
        var TaxAmount = ((partialValue/100) * AllSubTotal).toFixed(0)
        console.log(TaxAmount)
        setBillTax(TaxAmount)
        var AmountAddTax = (parseInt(AllSubTotal)+parseInt(TaxAmount)+parseInt(billshipping)-parseInt(billdiscount));
        setBillTotal(AmountAddTax)
        
      }

      function handleShipping(e){
        console.log('this is shipping edit')
        var AllSubTotal= 0;
        if(customerbill.length >=1){
            for (let i = 0, len = customerbill.length; i < len; i++) {
                AllSubTotal = AllSubTotal+parseInt(customerbill[i].sub_total)
                if(i == (len-1)){
                    setBillTotal(AllSubTotal)
                }
              }
        }else{
            setBillTotal(AllSubTotal)
        }
        var partialValue = e.target.value
            
        
        //var TaxAmount = ((partialValue/100) * AllSubTotal).toFixed(0)
        //console.log(TaxAmount)
        console.log(partialValue)
        if(partialValue){
            var AmountAddShipping = (parseInt(AllSubTotal) + parseInt(partialValue)+parseInt(billtax)-parseInt(billdiscount));
            setBillShipping(partialValue)
            setBillTotal(AmountAddShipping)
        }

      }


        
        


    return (
        <>
            <div class="popup requires-no-scroll">
                <div className="pos-header" style={{display:"flex", flexWrap:"nowrap"}}> 
                    <div style={{display:"flex", width:"50%", height:"35px",}}>
                        <div style={{marginLeft:"10px", display:"flex", alignContent:"center",alignItems:"center"}}>
                            <b>Location:</b>
                            <div className="dealer-selector" >
                                <div class="form-group" style={{margin:"2px", width:"200px"}}>
                                    <select class="form-control" style={{height:"30px", padding:'5px', border:"1px solid"}}>
                                        <option>Lahore</option>
                                        <option>Karachi</option>
                                        <option>Islamabad</option>
                                    </select>
                                </div>
                            </div>
                            </div>
                        <div style={{marginLeft:"15px", display:"flex", alignContent:"center",alignItems:"center"}}><b>Date: </b> {date}</div>
                        {/* <div style={{marginLeft:"15px", display:"flex", alignContent:"center",alignItems:"center"}}><b>Time: </b>{time}</div> */}
                    </div>
                    <div style={{display:"flex", width:"50%",height:"35px", alignContent:"center"}}>
                        <div style={{width:"80%"}}></div>
                        <div style={{height:"250px" ,width:"25%"}}>
                            
                            {iscalculator &&(
                                <div style={{height:"250px", marginTop:"35px"}}>
                                    <Calculator  />
                                </div>
                                
                            )}    
                        </div>
                        <div style={{display:"flex" , alignContent:"center", alignItems:"center", marginRight:"5px"}}>
                                <BsCalculator onClick={()=>OpenCalculator()}/>
                        </div>
                    </div>
                </div>
                <div className="pos-flex-container">
                    {/* bill container */}
                    <div className="pos-header bg-info pos-bill-container">
                        <div className="bill-header">
                            <div className="dealer-selector" >
                                <div class="form-group" style={{margin:"2px"}}>
                                    <select class="form-control" style={{height:"36px", padding:'5px', border:"1px solid"}}>
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                        <option>Option 3</option>
                                    </select>
                                </div>
                            </div>
                            <div className="dealer-searchbar">
                                <div class="form-group" style={{margin:"2px"}}>
                                    <div style={{display: "flex" , alignItems:"center"}}>
                                        <input type="search" class="form-control" style={{height:"36px", border:"1px solid"}} />
                                        <i style={{backgroundColor:"white", padding:"12px",height:"35px", border :"1px solid"}} class="fas fa-search"></i>
                                    </div>

                                </div>
                            </div>
                        </div>

                    
                        <div>
                            <div style={{display:"flex", flexWrap: "nowrap",width:"100%", backgroundColor:"white"}}>
                                <div  style={{height:"40px", width:"30%",fontSize:"17px",padding:"6px", border:"1px solid lightgray"}}>Product
                                </div>
                                <div  style={{height:"40px",width:"25%",fontSize:"17px",padding:"6px", border:"1px solid lightgray" }}>Quantity
                                </div>
                                <div  style={{height:"40px",width:"17%",fontSize:"17px", padding:"6px", border:"1px solid lightgray"}}>Price inc. tax
                                </div>
                                <div style={{height:"40px",width:"17%",fontSize:"17px", padding:"6px", border:"1px solid lightgray"}}>Subtotal
                                </div>
                                <div style={{height:"40px",width:"11%",fontSize:"17px",padding:"6px", border:"1px solid lightgray"}}><div>Action</div>
                                </div>
                        </div>

                        </div>
                        <div  className="bill-container-container" style={{height:"525px",overflow:"scroll",WebkitScrollSnapType:"none"}}>
                        {customerbill && customerbill.map(currentBill => ( 
                            <div style={{display:"flex", flexWrap: "nowrap",width:"100%", backgroundColor:"#EBEBEB", borderBottom:"1px solid lightgray", borderBottom:"1px solid"}}>
                                <div  style={{height:"60px", width:"30%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}>
                                    <p>{currentBill.book_title}</p>
                                </div>
                                <div  style={{height:"60px",width:"25%",fontSize:"17px",paddingTop:"10px", margin:"auto", display:"flex", flexWrap: "nowrap",justifyContent:"center"}}>
                                    <div style={{border:"1px solid lightgray" , width:"15%", height:"40px", display:"flex", alignItems:'center', justifyContent:"center"}}><BsFillPlusSquareFill style={{color:"green"}} onClick={()=>IncreaseQuantity(currentBill)}/></div>
                                    <div style={{border:"1px solid lightgray", width:"60%", height:"40px"}}><div><p>{currentBill.sell_quantity}</p></div></div>
                                    <div style={{border:"1px solid lightgray",width:"15%", height:"40px", display:"flex", alignItems:'center', justifyContent:"center"}}><BsDashSquareFill style={{color:'#DB1414'}}  onClick={()=>DecreaseQuantity(currentBill)}/></div>    
                                </div>
                                <div  style={{height:"60px",width:"17%",fontSize:"17px",paddingTop:"10px",margin:"auto",display:"flex", flexWrap: "nowrap",justifyContent:"center"}}>
                                    <div style={{border:"1px solid lightgray", width:"90%", height:"40px"}}><p>{currentBill.sale_price}</p></div>
                                </div>
                                <div style={{height:"60px",width:"17%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}>
                                    <p>{currentBill.sub_total}</p>
                                </div>
                                <div style={{height:"60px",width:"11%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}><BsXLg style={{color:"#DB1414"}} onClick={()=>DeleteitemFromBill(currentBill)}/>
                                </div>
                            </div>
                        ))}
    {/*                         <div style={{display:"flex", flexWrap: "nowrap",width:"100%", backgroundColor:"#EBEBEB", borderBottom:"1px solid lightgray", borderBottom:"1px solid"}}>
                                <div  style={{height:"60px", width:"30%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}>
                                    <p>Product Name</p>
                                </div>
                                <div  style={{height:"60px",width:"25%",fontSize:"17px",paddingTop:"10px", margin:"auto", display:"flex", flexWrap: "nowrap",justifyContent:"center"}}>
                                    <div style={{border:"1px solid lightgray" , width:"15%", height:"40px", display:"flex", alignItems:'center', justifyContent:"center"}}><BsFillPlusSquareFill style={{color:"green"}}/></div>
                                    <div style={{border:"1px solid lightgray", width:"60%", height:"40px"}}><div><p>Quantity</p></div></div>
                                    <div style={{border:"1px solid lightgray",width:"15%", height:"40px", display:"flex", alignItems:'center', justifyContent:"center"}}><BsDashSquareFill style={{color:'#DB1414'}}/></div>    
                                </div>
                                <div  style={{height:"60px",width:"17%",fontSize:"17px",paddingTop:"10px",margin:"auto",display:"flex", flexWrap: "nowrap",justifyContent:"center"}}>
                                    <div style={{border:"1px solid lightgray", width:"90%", height:"40px"}}><p>Price inc. tax</p></div>
                                </div>
                                <div style={{height:"60px",width:"17%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}>
                                    <p>Subtotal</p>
                                </div>
                                <div style={{height:"60px",width:"11%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}><BsXLg style={{color:"#DB1414"}}/>
                                </div>
                            </div> */}
    {/*                         <div style={{display:"flex", flexWrap: "nowrap",width:"100%", backgroundColor:"#EBEBEB", borderBottom:"1px solid lightgray", borderBottom:"1px solid"}}>
                                <div  style={{height:"60px", width:"30%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}>
                                    <p>Product Name</p>
                                </div>
                                <div  style={{height:"60px",width:"25%",fontSize:"17px",paddingTop:"10px", margin:"auto", display:"flex", flexWrap: "nowrap",justifyContent:"center"}}>
                                    <div style={{border:"1px solid lightgray" , width:"15%", height:"40px", display:"flex", alignItems:'center', justifyContent:"center"}}><BsFillPlusSquareFill style={{color:"green"}}/></div>
                                    <div style={{border:"1px solid lightgray", width:"60%", height:"40px"}}><div><p>Quantity</p></div></div>
                                    <div style={{border:"1px solid lightgray",width:"15%", height:"40px", display:"flex", alignItems:'center', justifyContent:"center"}}><BsDashSquareFill style={{color:'#DB1414'}}/></div>    
                                </div>
                                <div  style={{height:"60px",width:"17%",fontSize:"17px",paddingTop:"10px",margin:"auto",display:"flex", flexWrap: "nowrap",justifyContent:"center"}}>
                                    <div style={{border:"1px solid lightgray", width:"90%", height:"40px"}}><p>Price inc. tax</p></div>
                                </div>
                                <div style={{height:"60px",width:"17%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}>
                                    <p>Subtotal</p>
                                </div>
                                <div style={{height:"60px",width:"11%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}><BsXLg style={{color:"#DB1414"}}/>
                                </div>
                            </div> */}
                            {/* <div style={{display:"flex", flexWrap: "nowrap",width:"100%", backgroundColor:"white",borderBottom:"1px solid lightgray"}}>
                                <div  style={{height:"60px", width:"30%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}>
                                    <p>Product Name</p>
                                </div>
                                <div  style={{height:"60px",width:"25%",fontSize:"17px",paddingTop:"10px", margin:"auto", display:"flex", flexWrap: "nowrap",justifyContent:"center"}}>
                                    <div style={{border:"1px solid lightgray" , width:"15%", height:"40px"}}></div>
                                    <div style={{border:"1px solid lightgray", width:"60%", height:"40px"}}><div><p>Quantity</p></div></div>
                                    <div style={{border:"1px solid lightgray",width:"15%", height:"40px"}}></div>    
                                </div>
                                <div  style={{height:"60px",width:"17%",fontSize:"17px",paddingTop:"10px",margin:"auto",display:"flex", flexWrap: "nowrap",justifyContent:"center"}}>
                                    <div style={{border:"1px solid lightgray", width:"90%", height:"40px"}}><p>Price inc. tax</p></div>
                                </div>
                                <div style={{height:"60px",width:"17%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}>
                                    <p>Subtotal</p>
                                </div>
                                <div style={{height:"60px",width:"11%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}>
                                </div>
                            </div>
                            <div style={{display:"flex", flexWrap: "nowrap",width:"100%", backgroundColor:"white"}}>
                                <div  style={{height:"60px", width:"30%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}>
                                    <p>Product Name</p>
                                </div>
                                <div  style={{height:"60px",width:"25%",fontSize:"17px",paddingTop:"10px", margin:"auto", display:"flex", flexWrap: "nowrap",justifyContent:"center"}}>
                                    <div style={{border:"1px solid lightgray" , width:"15%", height:"40px"}}></div>
                                    <div style={{border:"1px solid lightgray", width:"60%", height:"40px"}}><p>Quantity</p></div>
                                    <div style={{border:"1px solid lightgray",width:"15%", height:"40px"}}></div>    
                                </div>
                                <div  style={{height:"60px",width:"17%",fontSize:"17px",paddingTop:"10px",margin:"auto",display:"flex", flexWrap: "nowrap",justifyContent:"center"}}>
                                    <div style={{border:"1px solid lightgray", width:"90%", height:"40px"}}><p>Price inc. tax</p></div>
                                </div>
                                <div style={{height:"60px",width:"17%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}>
                                    <p>Subtotal</p>
                                </div>
                                <div style={{height:"60px",width:"11%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}>
                                </div>
                            </div>
                            <div style={{display:"flex", flexWrap: "nowrap",width:"100%", backgroundColor:"white"}}>
                                <div  style={{height:"60px", width:"30%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}>
                                    <p>Product Name</p>
                                </div>
                                <div  style={{height:"60px",width:"25%",fontSize:"17px",paddingTop:"10px", margin:"auto", display:"flex", flexWrap: "nowrap",justifyContent:"center"}}>
                                    <div style={{border:"1px solid lightgray" , width:"15%", height:"40px"}}></div>
                                    <div style={{border:"1px solid lightgray", width:"60%", height:"40px"}}><p>Quantity</p></div>
                                    <div style={{border:"1px solid lightgray",width:"15%", height:"40px"}}></div>    
                                </div>
                                <div  style={{height:"60px",width:"17%",fontSize:"17px",paddingTop:"10px",margin:"auto",display:"flex", flexWrap: "nowrap",justifyContent:"center"}}>
                                    <div style={{border:"1px solid lightgray", width:"90%", height:"40px"}}><p>Price inc. tax</p></div>
                                </div>
                                <div style={{height:"60px",width:"17%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}>
                                    <p>Subtotal</p>
                                </div>
                                <div style={{height:"60px",width:"11%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}>
                                </div>
                            </div>
                            <div style={{display:"flex", flexWrap: "nowrap",width:"100%", backgroundColor:"white"}}>
                                <div  style={{height:"60px", width:"30%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}>
                                    <p>Product Name</p>
                                </div>
                                <div  style={{height:"60px",width:"25%",fontSize:"17px",paddingTop:"10px", margin:"auto", display:"flex", flexWrap: "nowrap",justifyContent:"center"}}>
                                    <div style={{border:"1px solid lightgray" , width:"15%", height:"40px"}}></div>
                                    <div style={{border:"1px solid lightgray", width:"60%", height:"40px"}}><p>Quantity</p></div>
                                    <div style={{border:"1px solid lightgray",width:"15%", height:"40px"}}></div>    
                                </div>
                                <div  style={{height:"60px",width:"17%",fontSize:"17px",paddingTop:"10px",margin:"auto",display:"flex", flexWrap: "nowrap",justifyContent:"center"}}>
                                    <div style={{border:"1px solid lightgray", width:"90%", height:"40px"}}><p>Price inc. tax</p></div>
                                </div>
                                <div style={{height:"60px",width:"17%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}>
                                    <p>Subtotal</p>
                                </div>
                                <div style={{height:"60px",width:"11%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}>
                                </div>
                            </div>
                            <div style={{display:"flex", flexWrap: "nowrap",width:"100%", backgroundColor:"white"}}>
                                <div  style={{height:"60px", width:"30%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}>
                                    <p>Product Name</p>
                                </div>
                                <div  style={{height:"60px",width:"25%",fontSize:"17px",paddingTop:"10px", margin:"auto", display:"flex", flexWrap: "nowrap",justifyContent:"center"}}>
                                    <div style={{border:"1px solid lightgray" , width:"15%", height:"40px"}}></div>
                                    <div style={{border:"1px solid lightgray", width:"60%", height:"40px"}}><p>Quantity</p></div>
                                    <div style={{border:"1px solid lightgray",width:"15%", height:"40px"}}></div>    
                                </div>
                                <div  style={{height:"60px",width:"17%",fontSize:"17px",paddingTop:"10px",margin:"auto",display:"flex", flexWrap: "nowrap",justifyContent:"center"}}>
                                    <div style={{border:"1px solid lightgray", width:"90%", height:"40px"}}><p>Price inc. tax</p></div>
                                </div>
                                <div style={{height:"60px",width:"17%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}>
                                    <p>Subtotal</p>
                                </div>
                                <div style={{height:"60px",width:"11%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}>
                                </div>
                            </div>
                            <div style={{display:"flex", flexWrap: "nowrap",width:"100%", backgroundColor:"white"}}>
                                <div  style={{height:"60px", width:"30%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}>
                                    <p>Product Name</p>
                                </div>
                                <div  style={{height:"60px",width:"25%",fontSize:"17px",paddingTop:"10px", margin:"auto", display:"flex", flexWrap: "nowrap",justifyContent:"center"}}>
                                    <div style={{border:"1px solid lightgray" , width:"15%", height:"40px"}}></div>
                                    <div style={{border:"1px solid lightgray", width:"60%", height:"40px"}}><p>Quantity</p></div>
                                    <div style={{border:"1px solid lightgray",width:"15%", height:"40px"}}></div>    
                                </div>
                                <div  style={{height:"60px",width:"17%",fontSize:"17px",paddingTop:"10px",margin:"auto",display:"flex", flexWrap: "nowrap",justifyContent:"center"}}>
                                    <div style={{border:"1px solid lightgray", width:"90%", height:"40px"}}><p>Price inc. tax</p></div>
                                </div>
                                <div style={{height:"60px",width:"17%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}>
                                    <p>Subtotal</p>
                                </div>
                                <div style={{height:"60px",width:"11%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}>
                                </div>
                            </div>
                            <div style={{display:"flex", flexWrap: "nowrap",width:"100%", backgroundColor:"white"}}>
                                <div  style={{height:"60px", width:"30%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}>
                                    <p>Product Name</p>
                                </div>
                                <div  style={{height:"60px",width:"25%",fontSize:"17px",paddingTop:"10px", margin:"auto", display:"flex", flexWrap: "nowrap",justifyContent:"center"}}>
                                    <div style={{border:"1px solid lightgray" , width:"15%", height:"40px"}}></div>
                                    <div style={{border:"1px solid lightgray", width:"60%", height:"40px"}}><p>Quantity</p></div>
                                    <div style={{border:"1px solid lightgray",width:"15%", height:"40px"}}></div>    
                                </div>
                                <div  style={{height:"60px",width:"17%",fontSize:"17px",paddingTop:"10px",margin:"auto",display:"flex", flexWrap: "nowrap",justifyContent:"center"}}>
                                    <div style={{border:"1px solid lightgray", width:"90%", height:"40px"}}><p>Price inc. tax</p></div>
                                </div>
                                <div style={{height:"60px",width:"17%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}>
                                    <p>Subtotal</p>
                                </div>
                                <div style={{height:"60px",width:"11%",fontSize:"17px",paddingTop:"10px",margin:"auto"}}>
                                </div>
                            </div> */}
                        </div>
                        {/* card footer */}
                        <div >
                            <div style={{display:"flex", flexWrap: "nowrap",width:"100%", backgroundColor:"white"}}>
                                <div  style={{height:"40px", width:"40%",fontSize:"17px",padding:"6px", borderTop:"2px solid lightgray"}}>Items : {numberofbillitem}
                                </div>
                                <div  style={{height:"40px",width:"30%",fontSize:"17px",padding:"6px", borderTop:"1px solid lightgray" }}>Total:  {billtotal}
                                </div>
                                <div onClick={()=>AddCash()}  onMouseOver={MouseOver} onMouseOut={MouseOut} style={{height:"40px",width:"30%",fontSize:"18px",border:'1px solid',border:"1px solid lightgray",color:"green", display:"flex",justifyContent:"center", alignItems:"center"}}>Check out
                                </div>
                
                        </div>
                        </div>
                        <div >
                            <div style={{display:"flex", flexWrap: "nowrap",width:"100%", backgroundColor:"white", height:"50px"}}>
                                <div  style={{height:"40px", width:"33%",fontSize:"15px",padding:"6px", borderTop:"1px solid lightgray"}}>
                                    Discount : <input onChange={(e) => handleDiscount(e)} name="discount" style={{width:'80px', borderWidth:"0px", borderBottom:"2px solid green"}}/>
                                </div>
                                <div  style={{height:"40px",width:"33%",fontSize:"15px",padding:"6px", borderTop:"1px solid lightgray" }}>
                                    Order Tax(+) : <input onChange={(e) => handleTax(e)} name="tax" style={{width:'80px',borderWidth:"0px",borderBottom:"2px solid green"}}/>
                                </div>
                                <div  style={{height:"40px",width:"33%",fontSize:"15px",padding:"6px", borderTop:"1px solid lightgray" }}>
                                    Shipping (+) : <input onChange={(e) => handleShipping(e)} name="shipping" style={{width:'80px',borderWidth:"0px",borderBottom:"2px solid green"}}/>
                                </div>
                        </div>
                        </div>
    
                    </div>
                    {/* bill container */}

                    {/* card container */}
                    <div className="pos-header  pos-item-contianer">
                        <div style={{backgroundColor:"white", width:"100%",height:"40px", display:"flex" ,flexWrap: "nowrap"}}>
                            {/* <div style={{width:"50%", height:"40px", fontSize:"12px" ,margin:"1px"}}>
                                    <div style={{width:"100%", height:"40px",}}>
                                        <input list="browsers" name="browser" id="browser" placeholder="All Catagories"  style={{height:"40px" , width:'70%', lineHeight:"initial"}}/>
                                            <datalist id="browsers">
                                                <option selected value="All Catagories"/>
                                                <option value="Firefox"/>
                                                <option value="Chrome"/>
                                                <option value="Opera"/>
                                                <option value="Safari"/>
                                            </datalist>
                                        <input type="submit"  style={{height:"40px" , width:'25%', lineHeight:"initial"}}/>
                                    </div>
                            </div>  */}
                            <div style={{ width:"50%", height:"40px", fontSize:"12px"}}> 
                                <div style={{width:"100%", height:"40px", fontSize:"12px", margin:"1px"}}>
                                        <div  style={{ width:"100%", height:"40px", display:"flex", }}>
                                            <input onChange={(e) => handleCategory(e)} list="category" name="categories" id="categories" placeholder="All Categories" style={{height:"40px" , width:'76%', lineHeight:"initial"}}/>
                                                <datalist  id="category">
                                                {categoryname && categoryname.map(Details => (
                                                <option>{Details.categories}</option>
                                                ))}
                                                </datalist>
                                            <div onClick={(e) => AllStock(e)}  style={{height:"40px" , width:'23%', lineHeight:"initial", display:"flex" , alignItems:'center', justifyContent:"center", border:"1px solid"}}>All</div>
                                        </div>
                                </div> 
                            </div> 
                            <div style={{ width:"50%", height:"40px", fontSize:"12px"}}> 
                                <div style={{width:"100%", height:"40px", fontSize:"12px", margin:"1px"}}>
                                        <div  style={{ width:"100%", height:"40px", display:"flex", }}>
                                            <input onChange={(e) => handle(e)} list="data" name="auther" id="auther" placeholder="All Authers" style={{height:"40px" , width:'76%', lineHeight:"initial"}}/>
                                                <datalist  id="data">
                                                {authername && authername.map(autherDetails => (
                                                <option>{autherDetails.auther}</option>
                                                ))}
                                                </datalist>
                                            <div onClick={(e) => AllStock(e)}  style={{height:"40px" , width:'23%', lineHeight:"initial", display:"flex" , alignItems:'center', justifyContent:"center", border:"1px solid"}}>All</div>
                                        </div>
                                </div> 
                            </div> 
                        </div>
                        {/* card */}
                        <div style={{ width:"100%",height:"620px",marginTop:"18px"}}>
                            <div className="pos-card-container" style={{ width:"100%",display:"flex", flexWrap:"wrap" ,height:"600px", overflow:"scroll", WebkitScrollSnapType:"none"}}>
                            {data.map(stockDetails => ( 
                                <div class="pos-card" style={{margin:"7px"}} onClick={()=>Bill(stockDetails)}>
                                <img src={stockDetails.stock_image} alt="John" style={{width:"132px",height:"130px"}}/>
                                <h5>{stockDetails.book_title}</h5>
                                </div>
                            ))}
                                {/* <div class="pos-card" style={{margin:"7px"}}>
                                    <img src="https://thevoicefinder.com/wp-content/themes/the-voice-finder/images/default-img.png" alt="John" style={{width:"100%",height:"130px"}}/>
                                    <h5>John Doe</h5>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    {/* card container  End*/}
                    
                </div>
            </div>
            {/* <PrintBill ref={componentRef}  billtotal={billtotal} /> */}
                <div ref={componentRef}   style={{height:"1200px", width:"100%", marginTop:"50px"}}>
                <div style={{margin:"0 auto", textAlign:"center", marginTop:"15px" }}>
                <div style={{padding:"10px",fontSize:'90px'}}>Awesome shop</div>
                <div style={{padding:"4px",fontSize:'30px'}}><b style={{marginRight:"3px"}}>Addresss:</b> Lahore urdu bazar</div>
                <div style={{padding:"4px",fontSize:'30px'}}><b style={{marginRight:"3px"}}>GSTIN:</b>34251569696</div>
                <div style={{padding:"8px",fontSize:'30px'}}><b>Invoice</b></div>
                </div>
                <div style={{padding:"30px"}}>
                    <div style={{display:"flex", flexWrap:"nowrap" , width:"100%", height:"32px",  fontSize:'25px'}}>
                        <div style={{ width:"50%"}}><b>Invoice No:</b>123</div>
                        <div style={{ width:"50%", textAlign:"end"}}><b>Date:</b>12/7/9</div>
                    </div>
                    <div style={{display:"flex", flexWrap:"nowrap" , width:"100%", height:"32px", fontSize:'25px'}}>
                        <div style={{ width:"50%"}}><b>Customer</b></div>
                    </div>
                    <div style={{display:"flex", flexWrap:"nowrap" , width:"100%", height:"32px",  fontSize:'25px'}}>
                        <div style={{width:"50%"}}>Walk In Customer</div>
                    </div>
                    <div style={{display:"flex", flexWrap:"nowrap" , width:"100%", height:"32px",  fontSize:'25px'}}>
                        <div style={{width:"50%"}}><b>Addresss:</b> Lahore urdu bazar</div>
                    </div> 
                    <div style={{display:"flex", flexWrap:"nowrap" , width:"100%", height:"32px", fontSize:'25px'}}>
                        <div style={{width:"50%"}}><b>Mobile:</b> 03498699360</div>
                    </div>
                </div>
                <div style={{padding:"30px"}}>
                    <div style={{display:"flex", flexWrap:"nowrap" , width:"100%", height:"40px",  fontSize:'20px', borderBottom:"1px solid black"}}>
                        <div style={{ width:"50%"}}><b>Product</b></div>
                        <div style={{ width:"20%", textAlign:"center", padding:"3px"}}><b>Quantity</b></div>
                        <div style={{ width:"15%", textAlign:"center", padding:"3px"}}><b>Unit Price</b></div>
                        <div style={{ width:"15%", textAlign:"center", padding:"3px"}}><b>Subtotal</b></div>
                    </div>
                    {customerbill && customerbill.map(currentBill => (
                        <div style={{display:"flex", flexWrap:"nowrap" , width:"100%", height:"25px",  fontSize:'18px'}}>
                            <div style={{ width:"50%"}}>{currentBill.book_title}</div>
                            <div style={{ width:"20%", textAlign:"center"}}>{currentBill.sell_quantity}</div>
                            <div style={{ width:"15%", textAlign:"center"}}>{currentBill.sale_price}</div>
                            <div style={{ width:"15%", textAlign:"center"}}>{currentBill.sub_total}</div>
                        </div>
                        
                    ))}
                    {/* <div style={{display:"flex", flexWrap:"nowrap" , width:"100%", height:"25px",  fontSize:'18px'}}>
                        <div style={{ width:"50%"}}>Child book Magic</div>
                        <div style={{ width:"20%", textAlign:"center"}}>12</div>
                        <div style={{ width:"15%", textAlign:"center"}}>500</div>
                        <div style={{ width:"15%", textAlign:"center"}}>6000</div>
                    </div> */}
                    <div style={{display:"flex", flexWrap:"nowrap" , width:"100%", height:"20px",  fontSize:'12px', borderBottom:"1px solid"}}></div>
                </div>
                <div style={{padding:"30px"}}>
                    <div style={{display:"flex", flexWrap:"nowrap" , width:"100%", height:"32px",  fontSize:'20px'}}>
                        <div style={{ width:"50%", display:"flex",flexWrap:"nowrap"}}><div style={{width:"30%"}}><b>Cash:</b></div>  <div style={{width:"70%"}}> Rs {billtotal}</div></div>
                        <div style={{ width:"25%", display:"flex",flexWrap:"nowrap"}}></div>
                        <div style={{ width:"25%", display:"flex",flexWrap:"nowrap", borderBottom:"1px solid lightgray"}}><div style={{width:"50%"}}><b>Discount:</b></div>  <div style={{width:"50%"}}> Rs {billdiscount}</div></div>
                    </div>
                    <div style={{display:"flex", flexWrap:"nowrap" , width:"100%", height:"32px",  fontSize:'20px'}}>
                        <div style={{ width:"50%", display:"flex",flexWrap:"nowrap"}}><div style={{width:"30%"}}><b>Total Paid:</b></div>  <div style={{width:"70%"}}> Rs {billtotal}</div></div>
                        <div style={{ width:"25%", display:"flex",flexWrap:"nowrap"}}></div>
                        <div style={{ width:"25%", display:"flex",flexWrap:"nowrap", borderBottom:"1px solid lightgray"}}><div style={{width:"50%"}}><b>Tax:</b></div>  <div style={{width:"50%"}}> Rs {billtax}</div></div>
                    </div>
                    <div style={{display:"flex", flexWrap:"nowrap" , width:"100%", height:"32px",  fontSize:'20px'}}>
                        <div style={{ width:"50%"}}></div>
                        <div style={{ width:"25%", display:"flex",flexWrap:"nowrap"}}></div>
                        <div style={{ width:"25%", display:"flex",flexWrap:"nowrap", borderBottom:"1px solid gray"}}><div style={{width:"50%"}}><b>Shipping:</b></div>  <div style={{width:"50%"}}> Rs {billshipping}</div></div>
                    </div>
                    <div style={{display:"flex", flexWrap:"nowrap" , width:"100%", height:"32px",  fontSize:'20px'}}>
                        <div style={{ width:"50%"}}></div>
                        <div style={{ width:"25%", display:"flex",flexWrap:"nowrap"}}></div>
                        <div style={{ width:"25%", display:"flex",flexWrap:"nowrap", borderBottom:"1px solid gray"}}><div style={{width:"50%"}}><b>Total:</b></div>  <div style={{width:"50%"}}> Rs {billtotal}</div></div>
                    </div>
                </div>
                
                </div>
        </>

    );
}

export default PointOfSale;



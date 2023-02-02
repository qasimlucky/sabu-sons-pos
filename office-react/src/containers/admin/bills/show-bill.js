
import React,{ useState,useEffect } from "react";
import {useLocation} from 'react-router-dom';
import  { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

function ShowBill(props) {

    const [customerbill, setCustomerBill] = useState([])

    const location = useLocation();
    console.log("this is receving")
    console.log(location.state.sendData) 
      const stockData = location.state.sendData;
      console.log(stockData)
      
      
      useEffect(() => {
        setCustomerBill(stockData.bill_items)
        },[stockData]);

        const componentRef = useRef(null);
        const handlePrint = useReactToPrint({
          content: () => componentRef.current,
          onAfterPrint: () => {

          }
          
        
        });
    return (
        <>
        <button onClick={()=>handlePrint()} style={{backgroundColor:"#3280F8"}}>
            Print
        </button>
         <div ref={componentRef} style={{height:"1200px", width:"100%", marginTop:"50px"}}>
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
                
                <div style={{display:"flex", flexWrap:"nowrap" , width:"100%", height:"20px",  fontSize:'12px', borderBottom:"1px solid"}}></div>
            </div>
            <div style={{padding:"30px"}}>
                <div style={{display:"flex", flexWrap:"nowrap" , width:"100%", height:"32px",  fontSize:'20px'}}>
                    <div style={{ width:"50%", display:"flex",flexWrap:"nowrap"}}><div style={{width:"30%"}}><b>Cash:</b></div>  <div style={{width:"70%"}}> Rs {stockData.bill_total}</div></div>
                    <div style={{ width:"25%", display:"flex",flexWrap:"nowrap"}}></div>
                    <div style={{ width:"25%", display:"flex",flexWrap:"nowrap", borderBottom:"1px solid lightgray"}}><div style={{width:"50%"}}><b>Discount:</b></div>  <div style={{width:"50%"}}> Rs {stockData.bill_discount}</div></div>
                </div>
                <div style={{display:"flex", flexWrap:"nowrap" , width:"100%", height:"32px",  fontSize:'20px'}}>
                    <div style={{ width:"50%", display:"flex",flexWrap:"nowrap"}}><div style={{width:"30%"}}><b>Total Paid:</b></div>  <div style={{width:"70%"}}> Rs {stockData.bill_total}</div></div>
                    <div style={{ width:"25%", display:"flex",flexWrap:"nowrap"}}></div>
                    <div style={{ width:"25%", display:"flex",flexWrap:"nowrap", borderBottom:"1px solid lightgray"}}><div style={{width:"50%"}}><b>Tax:</b></div>  <div style={{width:"50%"}}> Rs {stockData.bill_tax}</div></div>
                </div>
                <div style={{display:"flex", flexWrap:"nowrap" , width:"100%", height:"32px",  fontSize:'20px'}}>
                    <div style={{ width:"50%"}}></div>
                    <div style={{ width:"25%", display:"flex",flexWrap:"nowrap"}}></div>
                    <div style={{ width:"25%", display:"flex",flexWrap:"nowrap", borderBottom:"1px solid gray"}}><div style={{width:"50%"}}><b>Shipping:</b></div>  <div style={{width:"50%"}}> Rs {stockData.bill_shipping}</div></div>
                </div>
                <div style={{display:"flex", flexWrap:"nowrap" , width:"100%", height:"32px",  fontSize:'20px'}}>
                    <div style={{ width:"50%"}}></div>
                    <div style={{ width:"25%", display:"flex",flexWrap:"nowrap"}}></div>
                    <div style={{ width:"25%", display:"flex",flexWrap:"nowrap", borderBottom:"1px solid gray"}}><div style={{width:"50%"}}><b>Total:</b></div>  <div style={{width:"50%"}}> Rs {stockData.bill_total}</div></div>
                </div>
            </div>
        
        </div>
        </>

       );
}

export default ShowBill;
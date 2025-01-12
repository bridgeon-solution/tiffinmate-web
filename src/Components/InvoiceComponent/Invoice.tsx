import {
  Box,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Typography,Button
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { GetOrderById } from "../../Services/OrderService";
import { useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { useRef } from "react";
import { toast } from "react-toastify";
interface details {
  foodItemName: string;
  foodItemImage: string;
  
}

interface orderData{
  date:string,
  total_price:number,
  details: details[];

}

const InvoiceDailyOrder: React.FC = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;
  const [invoiceData, setInvoiceData] = useState<orderData | null>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);
  const downloadInvoice = () => {
    if (invoiceRef.current) {
      html2pdf()
        .from(invoiceRef.current)
        .save("invoice.pdf"); 
    }
  };
  
  useEffect(()=>{
   const fetchInvoiceDetails=async()=>{
    if (!orderId) return;
    try{
      const data=await GetOrderById(orderId);
      setInvoiceData(data.result);
    }catch{
      toast.error("something went wrong")
    }
   }
   fetchInvoiceDetails();
  },[orderId])
  
  

  return (
    <>
    <Box display='flex' justifyContent='center' alignItems='center' >
    <Box 
        sx={{
          height:{md:600,sx:"auto"},
          width:{md:700,sx:0},
          border: "1px solid #ddd",
          borderRadius: 2,
          padding: 2,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          mt: 20,
          ml: {md:10,xs:0},
        
        }}
        ref={invoiceRef}
      >
        <Typography
          variant="h3"
          sx={{ textAlign: "center", fontWeight: "bold", marginBottom: 2 }}
        >
          INVOICE
        </Typography>
        <br />

        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Billed to:
        </Typography>
        <Typography variant="body2" sx={{ marginLeft: 2, color: "#555" }}>
          TiffinMate
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Orderd Date:
        </Typography>
        <Typography variant="body2" sx={{ marginLeft: 2, color: "#555" }}>
        {invoiceData?.date}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Order Id:
        </Typography>
        <Typography variant="body2" sx={{ marginLeft: 2, color: "#555" }}>
          {orderId}
        </Typography>

        <Table
          sx={{
            mt: 2,
            border: "1px solid #ddd",
            "& th": {
              backgroundColor: "#f1f1f1",
              fontWeight: "bold",
              borderBottom: "1px solid #ddd",
              padding: 1,
              textAlign: "center",
            },
            "& td": {
              borderBottom: "1px solid #ddd",
              padding: 1,
              textAlign: "center",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Food name</TableCell>
              <TableCell>Quantity</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
  {invoiceData?.details.map((item) => (
    <TableRow >
      <TableCell>{item.foodItemName}</TableCell>
      <TableCell>1</TableCell>
    </TableRow>
  ))}
</TableBody>


        </Table>
       
       
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            fontSize: "1rem",
            color: "#333",
          }}
        >
          Total  Amount:
        </Typography>
        <Typography variant="body2" sx={{ ml: 10 }}>
          ₹{invoiceData?.total_price}
        </Typography>
        <Button
            variant="contained"
            
            sx={{ mt: 3 ,backgroundColor:"#e6852c"}}
            onClick={downloadInvoice}
          >
            Download Invoice
          </Button>
         
        </Box>
       
        </Box>
        
     
      
    </>
  );
};

export default InvoiceDailyOrder;

import React, { useState, useEffect, useRef } from "react";
import { GetAllFoodItems } from "../../Services/OrderService";
import { useLocation } from "react-router-dom";
import { Box, Button, Table, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import html2pdf from "html2pdf.js";
import { BackButton } from "../../Atoms/Button";


interface orderData{
  category_name:string;
  food_name:string;
  price:number;
  day:string;
}
const Subscriptioninvoice: React.FC = () => {
  const [foodData, setFoodData] = useState<orderData[]>([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const { menuid, categories } = location.state || {};
    const invoiceRef = useRef<HTMLDivElement>(null);
    const downloadInvoice = () => {
      if (invoiceRef.current) {
        html2pdf()
          .from(invoiceRef.current)
          .save("invoice.pdf"); 
      }
    };

  useEffect(() => {
    if (!menuid || !categories) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await GetAllFoodItems(menuid, categories);
        setFoodData(response.result || []);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchData();
  }, [menuid, categories]);

  const organizeData = () => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const groupedData: Record<string, Record<string, string>> = {};

    daysOfWeek.forEach((day) => {
      groupedData[day] = {};
      categories.forEach((category: string) => {
        groupedData[day][category] = ""; 
      });
    });

   
    foodData.forEach((item) => {
      if (item.day && item.category_name && item.food_name) {
        groupedData[item.day][item.category_name] = item.food_name;
      }
    });

    return { groupedData, daysOfWeek };
  };

  const { groupedData, daysOfWeek } = organizeData();

  return (
    <>
    <BackButton/>
    <Box display='flex' justifyContent='center' alignItems='center'>
      <Box  sx={{
          height:{md:600,sx:"auto"},
          width:{md:700,sx:0},
          border: "1px solid #ddd",
          borderRadius: 2,
          padding: 2,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          mt: 20,
          ml: {md:10,xs:0},
        
        }}
        ref={invoiceRef}>

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


    {loading && <p>Loading...</p>}

    {!loading && foodData.length > 0 && (
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
            <TableCell>Day</TableCell>
            <TableCell>Breakfast</TableCell>
            <TableCell>Lunch</TableCell>
            <TableCell>Dinner</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {daysOfWeek.map((day) => (
            <TableRow key={day}>
              <td>{day}</td>
              <td>{groupedData[day]["Breakfast"] || "_"}</td>
              <td>{groupedData[day]["Lunch"] || "_"}</td>
              <td>{groupedData[day]["Dinner"] || "_"}</td>
            </TableRow>
          ))}
        </tbody>
      </Table>
      
    )}
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
        ₹{foodData.length > 0 ? foodData[0].price : 0}</Typography>
        <Button
            variant="contained"
            
            sx={{ mt: 2 ,backgroundColor:"#e6852c"}}
            onClick={downloadInvoice}
          >
            Download Invoice
          </Button>

    {!loading && foodData.length === 0 && <p>No data available</p>}
  </Box>
  </Box>
  </>
  );
};

export default Subscriptioninvoice;

import { useEffect, useState } from "react";
import TopProvidersComponent from "../../Components/TopRatedProviders";
import { fetchApprovedProviderDetails } from "../../Services/ProviderService";
import { Provider } from "../../Components/TopRatedProviders/type";
import { Box, CircularProgress,Typography } from "@mui/material";
import {  useSearchParams } from "react-router-dom";
import { GetPaymentHistoryById, UpdatePaymentHistory } from "../../Services/OrderService";
import MonthlyBillModal from "../../Components/Monthly";
import { useRazorpayPayment } from "../../Common/Hook";
import { toast } from "react-toastify";
interface UpdateSubscription{
  payment_id:string,
  action:string
}
function TopProvidersContainer() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams]=useSearchParams();
  const [openModal,setOpenModal]=useState(false);
 const [totalAmount,setTotalAmount]=useState(0)
  const paymentid=searchParams.get('paymentId')
  const payment_id=paymentid||""
  const { initiatePayment, razorpayResponse } = useRazorpayPayment(payment_id || "", totalAmount);

  useEffect(() => {
    if (payment_id) {
      setOpenModal(true);
      PaymentHistoryById(payment_id);
    }
  }, [payment_id])
  const handleClose = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    const fetchProviders = async () => {
        setLoading(true)
      try {
        const response = await fetchApprovedProviderDetails();
        setProviders(response.result);
      } catch (err) {
        setError("Failed to fetch providers");
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  const handleRenew = async () => {
    try {
      console.log("Renewing subscription:", payment_id);
      await initiatePayment();
      handleClose();
    } catch (error) {
      console.error("Error renewing subscription:", error);
    }
  };

  const handleCancel = async () => {
     try {
                // Call API to update payment history
                const action='cancel'
                const values:UpdateSubscription={payment_id,action}
                await UpdatePaymentHistory(values); // Pass paymentId and the payment status
                toast.success("Payment history updated successfully.");
              } catch (apiError) {
                console.error("Error updating payment history:", apiError);
                toast.error("Failed to update payment history.");
              }
  };
  const PaymentHistoryById = async (payment_id: string) => {
    try {
      const response = await GetPaymentHistoryById(payment_id);
      console.log('Response:', response.result[0].amount);
      
      if (response?.result[0]?.amount) {
        setTotalAmount(Math.ceil(response.result[0].amount));
        console.log('s',totalAmount);
        
      } else {
        console.warn('Total price not found in response:', response);
        setTotalAmount(0);
      }
    } catch (error) {
      console.error('Error fetching subscription details:', error);
      setTotalAmount(0);
    }
  
  }
  console.log(totalAmount);
  useEffect(() => {
    if (razorpayResponse) {
      console.log("Payment Successful!", razorpayResponse);
    }
  }, [razorpayResponse]);
  
  if (loading){
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
      );
      }
      if (error){
       return(<Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
      );
      }
      
      return(
<>
      <TopProvidersComponent providers={providers} />
     
      {openModal && (
      <MonthlyBillModal
        openModal={openModal}
        handleClose={handleClose}
        handleRenew={handleRenew}
        handleCancel={handleCancel}
        payment_id={payment_id}
        totalAmount={totalAmount}
      />
      )}
     
      </>
    );  
}

export default TopProvidersContainer;

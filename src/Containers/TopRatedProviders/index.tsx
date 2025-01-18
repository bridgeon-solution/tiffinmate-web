import { useEffect, useState } from "react";
import TopProvidersComponent from "../../Components/TopRatedProviders";
import { fetchApprovedProviderDetails } from "../../Services/ProviderService";
import { Provider } from "../../Components/TopRatedProviders/type";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import {
  GetPaymentHistoryById,
  UpdatePaymentHistory,
} from "../../Services/OrderService";
import { useRazorpayPayment } from "../../Common/Hook";
import { toast } from "react-toastify";
import { FetchProfileService } from "../../Services/UserService";
import { UpdateSubscription } from "../../Components/MonthlyBillComponent/type";
import MonthlyBillModal from "../../Components/MonthlyBillComponent";

function TopProvidersContainer() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const [openModal, setOpenModal] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [userDetails, setUserDetails] = useState({ name: "", phone: "" });
  const paymentid = searchParams.get("paymentId");
  const payment_id = paymentid || "";
  const UpdateSubscription = async () => {
    try {
      const action = "renew";
      const values: UpdateSubscription = { payment_id, action };
      await UpdatePaymentHistory(values);
      toast.success("subscription renewed.");
    } catch (error) {
      toast.error("Failed to renew subscription.");
    }
  };
  const { initiatePayment } = useRazorpayPayment(
    totalAmount,
    userDetails,
    UpdateSubscription
  );

  const userId = localStorage.getItem("id");
  const fetchUser = async () => {
    try {
      const res = await FetchProfileService(userId);
      const { name, phone } = res.data.result;
      setUserDetails({ name, phone });
    } catch (error) {
      toast.error("Failed to fetch user details.");
    }
  };
  useEffect(() => {
    fetchUser();
  }, [userId]);
  useEffect(() => {
    if (payment_id) {
      setOpenModal(true);
      PaymentHistoryById(payment_id);
    }
  }, [payment_id]);
  const handleClose = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true);
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
      await initiatePayment();
      handleClose();
    } catch (error) {
      toast.error("Error renewing subscription");
    }
  };

  const handleCancel = async () => {
    try {
      const action = "cancel";
      const values: UpdateSubscription = { payment_id, action };
      await UpdatePaymentHistory(values);
      toast.success("subscription canceled");
    } catch (erro) {
      toast.error("Failed to cancel subscription.");
    }
  };
  const PaymentHistoryById = async (payment_id: string) => {
    try {
      const response = await GetPaymentHistoryById(payment_id);

      if (response?.result[0]?.amount) {
        setTotalAmount(Math.ceil(response.result[0].amount));
      } else {
        setTotalAmount(0);
      }
    } catch (error) {
      setTotalAmount(0);
    }
  };
  if (loading) {
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
  if (error) {
    return (
      <Box
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

  return (
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

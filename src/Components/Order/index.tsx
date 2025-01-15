import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { useLocation } from "react-router-dom";
import L from "leaflet";
import InputField from "../../Atoms/Input";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

interface OrderFormData {
  formData: {
    user_name: string;
    address: string;
    ph_no: string;
    city: string;
  };
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setOrderId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setDate: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: {
    user_name: string;
    address: string;
    ph_no: string;
    city: string;
  };
  loading: boolean;
}

const OrderComponent: React.FC<OrderFormData> = ({
  formData,
  handleSubmit,
  handleChange,
  errors,
  setSelectedCategories,
  setOrderId,
  setDate,
  loading,
}) => {
  const [selectedCity, setSelectedCity] = useState(formData.city || "");
  const [mapPosition, setMapPosition] = useState<[number, number] | null>(null);
  
  const user = localStorage.getItem("user");
  const { state } = useLocation();
  const { categories, orderId, date } = state || {};
  setSelectedCategories(categories);
  setOrderId(orderId);
  setDate(date);


  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setMapPosition([latitude, longitude]);

          const provider = new OpenStreetMapProvider();
          provider
            .search({ query: `${latitude}, ${longitude}` })
            .then((results) => {
              if (results[0]) {
                const city = results[0].label;
                setSelectedCity(city);

                handleChange({
                  target: {
                    name: "city",
                    value: city,
                  },
                } as React.ChangeEvent<HTMLInputElement>);
              }
            });
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setMapPosition([e.latlng.lat, e.latlng.lng]);

        const provider = new OpenStreetMapProvider();
        provider
          .search({ query: `${e.latlng.lat}, ${e.latlng.lng}` })
          .then((results) => {
            if (results[0]) {
              setSelectedCity(results[0].label);

              handleChange({
                target: {
                  name: "city",
                  value: results[0].label,
                },
              } as React.ChangeEvent<HTMLInputElement>);
            }
          });
      },
    });

    return mapPosition ? <Marker position={mapPosition}></Marker> : null;
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mt: 10,
        ml: { md: "25%", xs: 0 },
        padding: "20px",
        textAlign: "center",
        borderRadius: "8px",
        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom mt={5} mb={3}>
        Payment details
      </Typography>

      {/* Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <InputField
          label="Full Name"
          name="user_name"
          value={user}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />

        <InputField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          variant="outlined"
          fullWidth
        />
        <Typography variant="body2" color="error">
          {errors.address}
        </Typography>

       
       
        <MapContainer
          center={[51.505, -0.09]} 
          zoom={13}
          style={{ height: "300px", width: "100%", marginTop: "10px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />
        </MapContainer>

        <InputField
          label="Current Location"
          name="city"
          value={selectedCity || formData.city}
          onChange={handleChange}
          required
          variant="outlined"
          fullWidth
        />
        <Typography variant="body2" color="error">
          {errors.city}
        </Typography>
        <Button
          type="button"
          variant="contained"
          sx={{
            marginTop: 2,
            backgroundColor: "#f97f29",
            color: "#fff",
            "&:hover": { backgroundColor: "#f96c0a" },
          }}
          onClick={getCurrentLocation} 
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            "Get Current Location"
          )}
        </Button>

        <InputField
          label="Phone Number"
          name="ph_no"
          value={formData.ph_no}
          onChange={handleChange}
          required
          variant="outlined"
          fullWidth
        />
        <Typography variant="body2" color="error">
          {errors.ph_no}
        </Typography>

       

        <Button
          type="submit"
          variant="contained"
          sx={{
            marginTop: 2,
            backgroundColor: "#f97f29",
            color: "#fff",
            "&:hover": { backgroundColor: "#f96c0a" },
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            "Submit Details"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default OrderComponent;

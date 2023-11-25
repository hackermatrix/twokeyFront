import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const AddGeoLocation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 18.5962,
    lng: 73.9223,
  });
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      console.error(
        "Google Maps API key not found. Make sure to set it in the .env file."
      );
    }
  }, []);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleMapClick = async (e) => {
    const clickedLocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setSelectedLocation(clickedLocation);

    try {
      const address = await getAddressFromLatLng(clickedLocation);
      setSelectedAddress(address);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const getAddressFromLatLng = async (location) => {
    const geocoder = new window.google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ location }, (results, status) => {
        if (status === "OK" && results[0]) {
          resolve(results[0].formatted_address);
        } else {
          reject("Unable to fetch address");
        }
      });
    });
  };

  const handleConfirmLocation = () => {
    if (selectedLocation) {
      console.log("Selected Location:", selectedLocation);
      console.log("Selected Address:", selectedAddress);
      // You can perform any other actions with the selected location and address here
    }
    closeDialog();
  };

  return (
    <div className="">
      <button
        onClick={openDialog}
        className="text-sm rounded-md py-[5px] px-3 border border-gray-300 bg-gray-50"
      >
        Add New Geo-location
      </button>

      <Dialog
        open={isOpen}
        onClose={closeDialog}
        PaperProps={{
          style: {
            borderRadius: "5px",
          },
        }}
      >
        <DialogTitle>New Geo - location</DialogTitle>
        <DialogContent
          style={{
            backgroundColor: "#F7F8FA",
            margin: 0,
            padding: 0,
          }}
        >
          <div className="w-[506px]">
            <LoadScript
              googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            >
              <GoogleMap
                mapContainerStyle={{ height: "320px", width: "100%" }}
                onClick={handleMapClick}
                center={selectedLocation}
                zoom={13}
              >
                {selectedLocation && <Marker position={selectedLocation} />}
              </GoogleMap>
            </LoadScript>
          </div>
        </DialogContent>
        <DialogActions sx={{ padding: "10px" }}>
          <button
            className="px-2 py-1 mx-2 rounded-lg shadow-sm border border-gray-300"
            onClick={closeDialog}
            color="primary"
          >
            Cancel
          </button>
          <button
            className="px-2 py-1 rounded-lg shadow-sm bg-[#5E5ADB] text-white"
            onClick={handleConfirmLocation}
          >
            Confirm Location
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddGeoLocation;
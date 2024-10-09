import React, { useState, useEffect, useCallback } from "react";
import { Modal, Box, Button, TextField } from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import DevicesModal from "./DevicesModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function EnergyUsage({
  open,
  handleClose,
  energyEmissions,
  setEnergyEmission,
  defaultDevicesData,
  setDefaultDevicesData,
}) {
  const [isDevicesModalOpen, setIsDevicesModalOpen] = useState(false);
  const openDevicesModal = () => {
    setIsDevicesModalOpen(true);
  };
  const closeDevicesModal = () => {
    setIsDevicesModalOpen(false);
  };

  const [consumption, setConsumption] = useState(0);
  const [time, setTime] = useState(0);

  const emissionFactor = 0.4;

  const handleSubmit = useCallback(() => {
    if (!consumption || !time) {
      alert("All fields are required");
      return;
    }

    const timeToH = time / 60;
    const co2Produced = consumption * timeToH * emissionFactor;
    setEnergyEmission((prev) => (parseFloat(prev) + co2Produced).toFixed(2));
    handleClose();
  }, [defaultDevicesData, consumption, time]);

  const handleDeviceSelection = useCallback(
    (deviceData) => {
      setConsumption(deviceData.consumption);
      setTime(deviceData.time);
      closeDevicesModal();
    },
    [defaultDevicesData]
  );

  useEffect(() => {
    setTime(0);
    setConsumption(0);
  }, [energyEmissions]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2>Energy Usage</h2>
        <TextField
          color="success"
          label="Consume (kWh)"
          type="number"
          fullWidth
          value={consumption}
          onChange={(e) => setConsumption(e.target.value)}
          margin="normal"
        />
        <TextField
          color="success"
          label="Usage Time (minutes/day)"
          type="number"
          fullWidth
          value={time}
          onChange={(e) => setTime(e.target.value)}
          margin="normal"
        />

        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}
          style={{ marginRight: ".5rem", marginTop: "1rem" }}
        >
          <SaveAltIcon style={{ marginRight: ".2rem" }} /> Save
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={openDevicesModal}
          style={{ marginTop: "1rem" }}
        >
          Devices
        </Button>

        <DevicesModal
          open={isDevicesModalOpen}
          handleClose={closeDevicesModal}
          handleDeviceSelection={handleDeviceSelection}
          defaultDevicesData={defaultDevicesData}
          setDefaultDevicesData={setDefaultDevicesData}
        />
      </Box>
    </Modal>
  );
}

export default EnergyUsage;

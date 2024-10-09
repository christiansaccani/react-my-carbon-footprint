import React, { useState, useEffect, useCallback } from "react";
import {
  Modal,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import SettingsIcon from "@mui/icons-material/Settings";

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

function DevicesModal({
  open,
  handleClose,
  handleDeviceSelection,
  defaultDevicesData,
  setDefaultDevicesData,
}) {
  const [newDeviceName, setNewDeviceName] = useState(null);
  const [newDeviceConsumption, setNewDeviceConsumption] = useState(null);
  const [newDeviceTime, setNewDeviceTime] = useState(null);
  const [selectedDeviceName, setSelectedDeviceName] = useState(null);

  const handleAddDevice = useCallback(() => {
    if (!newDeviceName.trim() || !newDeviceConsumption || !newDeviceTime) {
      alert("All fields are required");
      return;
    }

    const alreadyUsed = defaultDevicesData.some(
      (device) =>
        // Check for already existing name && allow same name in Edit
        device.name === newDeviceName && device.name !== selectedDeviceName
    );
    if (alreadyUsed) {
      alert(
        "A device with this name already exists. Please choose a different name."
      );
      return;
    }

    const newDevice = {
      name: newDeviceName,
      consumption: parseFloat(newDeviceConsumption),
      time: parseInt(newDeviceTime, 10),
    };

    if (selectedDeviceName) {
      // Editing existing device
      setDefaultDevicesData((prev) =>
        prev.map((device) =>
          device.name === selectedDeviceName ? newDevice : device
        )
      );
    } else {
      // Adding new device
      setDefaultDevicesData((prev) => [...prev, newDevice]);
    }
  }, [
    newDeviceName,
    newDeviceConsumption,
    newDeviceTime,
    selectedDeviceName,
    defaultDevicesData,
    setDefaultDevicesData,
  ]);

  const handleEditDevice = useCallback((deviceData) => {
    setNewDeviceName(deviceData.name);
    setNewDeviceConsumption(deviceData.consumption);
    setNewDeviceTime(deviceData.time);
    setSelectedDeviceName(deviceData.name);
  }, []);

  useEffect(() => {
    setNewDeviceName("");
    setNewDeviceConsumption("");
    setNewDeviceTime("");
    setSelectedDeviceName(null);
  }, [defaultDevicesData]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2>Manage Devices</h2>

        {/* Form to add or edit devices */}
        <TextField
          color="success"
          label="Device Name"
          fullWidth
          value={newDeviceName}
          onChange={(e) => setNewDeviceName(e.target.value)}
          margin="normal"
        />
        <TextField
          color="success"
          label="Consumption (kWh)"
          type="number"
          fullWidth
          value={newDeviceConsumption}
          onChange={(e) => setNewDeviceConsumption(e.target.value)}
          margin="normal"
        />
        <TextField
          color="success"
          label="Usage Time (minutes/day)"
          type="number"
          fullWidth
          value={newDeviceTime}
          onChange={(e) => setNewDeviceTime(e.target.value)}
          margin="normal"
        />

        <h3 style={{ marginTop: ".5rem" }}>Select a Device</h3>
        <List>
          {defaultDevicesData.map((deviceData) => (
            <ListItem
              button
              key={deviceData.name}
              onClick={() => handleDeviceSelection(deviceData)}
              style={{ cursor: "pointer" }}
            >
              <ListItemText
                primary={`${deviceData.name}`}
                secondary={`${deviceData.consumption} kWh - ${deviceData.time} mins`}
              />
              <Button
                color="success"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditDevice(deviceData);
                }}
                style={{ marginLeft: "1rem" }}
              >
                <SettingsIcon />
              </Button>
            </ListItem>
          ))}
        </List>

        <Button
          variant="contained"
          color="success"
          onClick={handleAddDevice}
          style={{ marginRight: ".5rem", marginTop: "1rem" }}
        >
          <PlaylistAddIcon style={{ marginRight: ".2rem" }} />{" "}
          {selectedDeviceName ? "Save Device" : "Add Device"}
        </Button>

        <Button
          onClick={handleClose}
          color="success"
          style={{ marginTop: "1rem" }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default DevicesModal;

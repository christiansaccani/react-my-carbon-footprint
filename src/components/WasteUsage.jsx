import React, { useState, useEffect, useCallback } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

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

// CO2 (kg) production per 10-liter bag
const wasteOptions = [
  { label: "Organic Waste", co2PerBag: 0.03 },
  { label: "Plastic Waste", co2PerBag: 0.15 },
  { label: "Glass Waste", co2PerBag: 0.02 },
  { label: "Unsorted Waste", co2PerBag: 0.3 },
];

function WasteUsage({ open, handleClose, wasteEmissions, setWasteEmission }) {
  const [wasteType, setWasteType] = useState(wasteOptions[0].co2PerBag);
  const [bags, setBags] = useState(0);

  const handleWasteChange = (event) => {
    const selectedOption = wasteOptions.find(
      (option) => option.label === event.target.value
    );
    setWasteType(selectedOption.co2PerBag);
  };

  const handleBagsChange = (event) => {
    setBags(event.target.value);
  };

  const handleSubmit = useCallback(() => {
    if (!bags) {
      alert("Number of bags is required");
      return;
    }

    const co2Produced = bags * wasteType;
    setWasteEmission((prev) => (parseFloat(prev) + co2Produced).toFixed(2));
    handleClose();
  }, [wasteType, bags]);

  useEffect(() => {
    setBags(0);
    setWasteType(wasteOptions[0].co2PerBag);
  }, [wasteEmissions]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2>Waste Usage</h2>
        <FormControl fullWidth margin="normal">
          <InputLabel color="success">Type</InputLabel>
          <Select
            color="success"
            defaultValue={wasteOptions[0].label}
            onChange={handleWasteChange}
            style={{ marginTop: "10px" }}
          >
            {wasteOptions.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          color="success"
          label="Number of 10L Bags"
          type="number"
          fullWidth
          value={bags}
          onChange={handleBagsChange}
          margin="normal"
        />
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}
          aria-hidden="false"
          style={{ marginTop: "1rem" }}
        >
          <SaveAltIcon style={{ marginRight: ".2rem" }} /> Save
        </Button>
      </Box>
    </Modal>
  );
}

export default WasteUsage;

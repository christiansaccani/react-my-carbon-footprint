import React, { useCallback, useState, useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

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

// CO2 (g) production per kilometer
const transportOptions = [
  { label: "Car", co2PerKm: 100 },
  { label: "Hybrid Car", co2PerKm: 70 },
  { label: "Bus", co2PerKm: 50 },
  { label: "Train", co2PerKm: 20 },
  { label: "Airplane", co2PerKm: 120 },
];

function THabitsModal({ open, handleClose, setMyHabitsData, myHabitsData }) {
  const [tHabitName, setTHabitName] = useState(null);
  const [tHabitVehicle, setTHabitVehicle] = useState(transportOptions[0].label);
  const [tHabitDistance, setTHabitDistance] = useState(0);

  const handleVehicleChange = (event) => {
    setTHabitVehicle(event.target.value);
  };

  const handleAddHabit = useCallback(() => {
    if (!tHabitName || !tHabitVehicle || tHabitDistance <= 0) {
      alert("All fields must be filled correctly.");
      return;
    }

    const alreadyUsed = myHabitsData.some((habit) => habit.name === tHabitName);
    if (alreadyUsed) {
      alert(
        "An habit with this name already exists. Please choose a different name."
      );
      return;
    }

    const newHabit = {
      type: "transport",
      name: tHabitName,
      vehicle: tHabitVehicle,
      distance: tHabitDistance,
      co2PerKm: transportOptions.find(
        (option) => option.label === tHabitVehicle
      ).co2PerKm,
    };

    setMyHabitsData((prevData) => [...prevData, newHabit]);
    handleClose();
  }, [tHabitName, tHabitVehicle, tHabitDistance]);

  useEffect(() => {
    setTHabitName(null);
    setTHabitVehicle(transportOptions[0].label);
    setTHabitDistance(0);
  }, [myHabitsData]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2>Add Transport Habit</h2>

        <TextField
          label="Name"
          type="text"
          fullWidth
          value={tHabitName}
          onChange={(e) => setTHabitName(e.target.value)}
          margin="normal"
        />

        {/* Select for Transport Mode */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Transport Mode</InputLabel>
          <Select
            value={tHabitVehicle}
            onChange={handleVehicleChange}
            label="Transport Mode"
          >
            {transportOptions.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Daily Distance (Km)"
          type="number"
          fullWidth
          value={tHabitDistance}
          onChange={(e) => setTHabitDistance(e.target.value)}
          margin="normal"
        />

        {/* Button to add the habit */}
        <Button
          variant="contained"
          color="success"
          onClick={handleAddHabit}
          style={{ marginTop: "1rem" }}
        >
          Add Habit
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

export default THabitsModal;

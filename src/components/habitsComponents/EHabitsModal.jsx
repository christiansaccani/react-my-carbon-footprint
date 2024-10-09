import React, { useCallback, useState, useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
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

function THabitsModal({ open, handleClose, setMyHabitsData, myHabitsData }) {
  const [eHabitName, setEHabitName] = useState(null);
  const [eHabitConsumption, setEHabitConsumption] = useState(0);
  const [eHabitTime, setEHabitTime] = useState(0);

  const handleAddHabit = useCallback(() => {
    if (!eHabitName || eHabitConsumption <= 0 || eHabitTime <= 0) {
      alert("All fields must be filled correctly.");
      return;
    }

    const alreadyUsed = myHabitsData.some((habit) => habit.name === eHabitName);
    if (alreadyUsed) {
      alert(
        "An habit with this name already exists. Please choose a different name."
      );
      return;
    }

    const newHabit = {
      type: "energy",
      name: eHabitName,
      consumption: eHabitConsumption,
      time: eHabitTime,
    };

    setMyHabitsData((prevData) => [...prevData, newHabit]);
    handleClose();
  }, [eHabitName, eHabitConsumption, eHabitTime]);

  useEffect(() => {
    setEHabitName(null);
    setEHabitConsumption(0);
    setEHabitTime(0);
  }, [myHabitsData]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2>Add Energy Habit</h2>

        <TextField
          label="Name"
          type="text"
          fullWidth
          value={eHabitName}
          onChange={(e) => setEHabitName(e.target.value)}
          margin="normal"
        />

        <TextField
          color="success"
          label="Consume (kWh)"
          type="number"
          fullWidth
          value={eHabitConsumption}
          onChange={(e) => setEHabitConsumption(e.target.value)}
          margin="normal"
        />

        <TextField
          color="success"
          label="Usage Time (minutes/day)"
          type="number"
          fullWidth
          value={eHabitTime}
          onChange={(e) => setEHabitTime(e.target.value)}
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

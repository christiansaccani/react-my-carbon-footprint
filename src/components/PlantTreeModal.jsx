import React, { useState, useEffect, useCallback } from "react";
import { Modal, Box, Button, TextField, FormControl } from "@mui/material";
import GrassIcon from "@mui/icons-material/Grass";

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

function PlantTreeModal({
  open,
  handleClose,
  availableTrees,
  setAvailableTrees,
}) {
  const [numberOfTrees, setNumberOfTrees] = useState(0);

  const handleSubmit = useCallback(() => {
    if (!numberOfTrees) {
      alert("Plant at least one tree!");
      return;
    }

    setAvailableTrees(parseFloat(availableTrees) + parseFloat(numberOfTrees));
    handleClose();
  }, [availableTrees, numberOfTrees]);

  useEffect(() => {
    setNumberOfTrees(0);
  }, [availableTrees]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2>Plant a Tree</h2>

        <FormControl fullWidth margin="normal">
          <TextField
            color="success"
            label="Trees"
            type="number"
            fullWidth
            value={numberOfTrees}
            onChange={(e) => setNumberOfTrees(e.target.value)}
            margin="normal"
          />
        </FormControl>

        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}
          aria-hidden="false"
          style={{ marginTop: "1rem" }}
        >
          <GrassIcon style={{ marginRight: ".5rem" }} /> Plant with Tree-Nation
        </Button>
      </Box>
    </Modal>
  );
}

export default PlantTreeModal;

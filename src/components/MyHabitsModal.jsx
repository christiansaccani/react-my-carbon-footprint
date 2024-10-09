import React, { useState, useEffect } from "react";
import { Modal, Box, Button, Dialog } from "@mui/material";
import THabitsModal from "./habitsComponents/THabitsModal";
import EHabitsModal from "./habitsComponents/EHabitsModal";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import RecyclingIcon from "@mui/icons-material/Recycling";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const iconMap = {
  transport: <ElectricCarIcon />,
  energy: <EnergySavingsLeafIcon />,
  waste: <RecyclingIcon />,
};

// Cell Renderer for Category
const CategoryCellRenderer = (params) => {
  const icon = iconMap[params.value];
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </div>
  );
};

const columnDefs = [
  { headerName: "Name", field: "name", flex: 1 },
  {
    headerName: "Category",
    field: "type",
    flex: 0.5,
    cellRenderer: CategoryCellRenderer,
  },
];

function MyHabitsModal({
  open,
  handleClose,
  myHabitsData,
  setMyHabitsData,
  setMyTHabitsValue,
  setMyEHabitsValue,
}) {
  /* Booleans Section */
  const [isTHabitOpen, setIsTHabitOpen] = useState(false);
  const [isEHabitOpen, setIsEHabitOpen] = useState(false);
  const emissionFactor = 0.4;

  /* Modal handles Section */
  const openTHabitModal = () => setIsTHabitOpen(true);
  const closeTHabitModal = () => setIsTHabitOpen(false);
  const openEHabitModal = () => setIsEHabitOpen(true);
  const closeEHabitModal = () => setIsEHabitOpen(false);

  // List of habits type
  const typeOptions = [
    {
      label: "Transport",
      icon: <ElectricCarIcon />,
      openModal: openTHabitModal,
    },
    {
      label: "Energy",
      icon: <EnergySavingsLeafIcon />,
      openModal: openEHabitModal,
    },
  ];

  useEffect(() => {
    const totalTHabitsEmissions = myHabitsData
      .filter((item) => item.type === "transport")
      .reduce((acc, item) => acc + item.distance * item.co2PerKm * 0.001, 0);

    setMyTHabitsValue(totalTHabitsEmissions);

    const totalEHabitsEmissions = myHabitsData
      .filter((item) => item.type === "energy")
      .reduce(
        (acc, item) =>
          acc + item.consumption * (item.time / 60) * emissionFactor,
        0
      );

    setMyEHabitsValue(totalEHabitsEmissions);
  }, [myHabitsData, setMyTHabitsValue]);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h2>Manage My Habits</h2>

          {/* Render buttons for each type option */}
          <div
            style={{
              display: "flex",
              gap: ".5rem",
              width: "100%",
              marginTop: "1rem",
            }}
          >
            {typeOptions.map((option) => (
              <Button
                key={option.label}
                variant="contained"
                color="success"
                onClick={option.openModal}
                style={{ flex: 1, display: "flex", gap: ".2rem" }}
              >
                {option.icon} {option.label}
              </Button>
            ))}
          </div>

          <div
            className="ag-theme-alpine"
            style={{ height: 300, marginTop: "1rem" }}
          >
            <AgGridReact columnDefs={columnDefs} rowData={myHabitsData} />
          </div>

          <Button
            onClick={handleClose}
            color="success"
            style={{ marginTop: "1rem" }}
          >
            Close
          </Button>
        </Box>
      </Modal>

      {/* Modal for Transport Habits */}
      <Dialog
        open={isTHabitOpen}
        onClose={closeTHabitModal}
        fullWidth
        maxWidth="md"
      >
        <THabitsModal
          open={isTHabitOpen}
          handleClose={closeTHabitModal}
          myHabitsData={myHabitsData}
          setMyHabitsData={setMyHabitsData}
        />
      </Dialog>

      {/* Modal for Energy Habits */}
      <Dialog
        open={isEHabitOpen}
        onClose={closeEHabitModal}
        fullWidth
        maxWidth="md"
      >
        <EHabitsModal
          open={isEHabitOpen}
          handleClose={closeEHabitModal}
          myHabitsData={myHabitsData}
          setMyHabitsData={setMyHabitsData}
        />
      </Dialog>
    </div>
  );
}

export default MyHabitsModal;

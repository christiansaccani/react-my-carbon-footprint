import React, { useState, useEffect, useCallback } from "react";
import { Button, Dialog } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import TransportUsage from "./components/TransportUsage";
import EnergyUsage from "./components/EnergyUsage";
import WasteUsage from "./components/WasteUsage";
import PlantTreeModal from "./components/PlantTreeModal";
import MyHabitsModal from "./components/MyHabitsModal";
import "./App.css";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import RecyclingIcon from "@mui/icons-material/Recycling";
import HistoryIcon from "@mui/icons-material/History";
import ForestIcon from "@mui/icons-material/Forest";
import StarIcon from "@mui/icons-material/Star";

function App() {
  /* Ints Section */
  const [totalEmissions, setTotalEmission] = useState(0);
  const [transportsEmissions, setTransportsEmission] = useState(0);
  const [energyEmissions, setEnergyEmission] = useState(0);
  const [wasteEmissions, setWasteEmission] = useState(0);
  const [neededTrees, setNeededTrees] = useState(0);
  const [availableTrees, setAvailableTrees] = useState(25);
  const [differenceTrees, setDifferenceTrees] = useState(0);
  /* Arrays Section */
  const [defaultDevicesData, setDefaultDevicesData] = useState([]);
  const [myHabitsData, setMyHabitsData] = useState([]);
  const [myTHabitsValue, setMyTHabitsValue] = useState(0);
  const [myEHabitsValue, setMyEHabitsValue] = useState(0);
  /* Booleans Section */
  const [isTransportOpen, setIsTransportOpen] = useState(false);
  const [isEnergyOpen, setIsEnergyOpen] = useState(false);
  const [isWasteOpen, setIsWasteOpen] = useState(false);
  const [isPlantTreeOpen, setIsPlantTreeOpen] = useState(false);
  const [isMyHabitsOpen, setIsMyHabitsOpen] = useState(false);

  const emissionsData = [
    {
      label: "Transport Emissions",
      value:
        (parseFloat(transportsEmissions) + parseFloat(myTHabitsValue)).toFixed(
          2
        ) + " kg",
    },
    {
      label: "Usage Emissions",
      value:
        (parseFloat(energyEmissions) + parseFloat(myEHabitsValue)).toFixed(2) +
        " kg",
    },
    { label: "Waste Emissions", value: wasteEmissions + " kg" },
  ];

  const columnDefs = [
    {
      headerName: "Category",
      field: "label",
      cellClass: "label-cell",
      flex: 1,
    },
    {
      headerName: "Footprint",
      field: "value",
      cellClass: "value-cell",
      flex: 0.5,
    },
  ];

  /* Set Modal Section */
  const openTransportModal = () => {
    setIsTransportOpen(true);
  };
  const closeTransportModal = () => {
    setIsTransportOpen(false);
  };
  const openEnergyModal = () => {
    setIsEnergyOpen(true);
  };
  const closeEnergyModal = () => {
    setIsEnergyOpen(false);
  };
  const openWasteModal = () => {
    setIsWasteOpen(true);
  };
  const closeWasteModal = () => {
    setIsWasteOpen(false);
  };
  const openPlantTreeModal = () => {
    setIsPlantTreeOpen(true);
  };
  const closePlantTreeModal = () => {
    setIsPlantTreeOpen(false);
  };
  const openMyHabitsModal = () => {
    setIsMyHabitsOpen(true);
  };
  const closeMyHabitsModal = () => {
    setIsMyHabitsOpen(false);
  };
  /* ----------------- */

  const resetDailyData = useCallback(() => {
    setEnergyEmission(0);
    setTransportsEmission(0);
    setWasteEmission(0);
  }, [transportsEmissions, energyEmissions, wasteEmissions]);

  useEffect(() => {
    const sumAllEmission = (
      parseFloat(transportsEmissions) +
      parseFloat(energyEmissions) +
      parseFloat(wasteEmissions) +
      parseFloat(myTHabitsValue) +
      parseFloat(myEHabitsValue)
    ).toFixed(2);

    setTotalEmission(sumAllEmission);

    const neededTreesValue = (parseFloat(sumAllEmission) / 0.06).toFixed(1);
    setNeededTrees(neededTreesValue);

    const differenceTreesValue = (
      parseFloat(availableTrees) - parseFloat(neededTreesValue)
    ).toFixed(1);
    setDifferenceTrees(differenceTreesValue);
  }, [
    transportsEmissions,
    energyEmissions,
    wasteEmissions,
    availableTrees,
    myTHabitsValue,
  ]);

  return (
    <div id="app_container">
      <h1>Your Carbon Footprint: {totalEmissions} kg</h1>
      <h2>Today you need {neededTrees} trees</h2>
      <h4>
        Trees left:{" "}
        <span style={{ color: differenceTrees >= 0 ? "green" : "red" }}>
          {differenceTrees}
        </span>{" "}
        / On {availableTrees} trees.
      </h4>
      <div id="adds_container" style={{ display: "flex", gap: "1rem" }}>
        <Button
          variant="contained"
          color="success"
          onClick={openTransportModal}
          aria-hidden="false"
        >
          <ElectricCarIcon style={{ marginRight: ".5rem" }} />
          Add Transport
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={openEnergyModal}
          aria-hidden="false"
        >
          <EnergySavingsLeafIcon style={{ marginRight: ".5rem" }} />
          Add Energy
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={openWasteModal}
          aria-hidden="false"
        >
          <RecyclingIcon style={{ marginRight: ".5rem" }} />
          Add Waste
        </Button>
      </div>

      {/* Tabella */}
      <div className="ag-theme-quartz" style={{ height: 176.18, width: 300 }}>
        <AgGridReact
          rowData={emissionsData}
          columnDefs={columnDefs}
          frameworkComponents={{
            valueCellRenderer: (params) => (
              <span style={{ float: "right" }}>{params.value}</span>
            ),
          }}
        />
      </div>

      <div id="btns_container" style={{ display: "flex", gap: "1rem" }}>
        <Button
          variant="contained"
          color="error"
          onClick={resetDailyData}
          aria-hidden="false"
        >
          <HistoryIcon style={{ marginRight: ".5rem" }} />
          Day Reset
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={openPlantTreeModal}
          aria-hidden="false"
        >
          <ForestIcon style={{ marginRight: ".5rem" }} />
          Plant a Tree
        </Button>
        <Button
          variant="contained"
          onClick={openMyHabitsModal}
          aria-hidden="false"
          style={{ backgroundColor: "black" }}
        >
          <StarIcon style={{ marginRight: ".5rem" }} />
          My Habits
        </Button>
      </div>

      {/* Modale per gestione trasporti */}
      <Dialog
        open={isTransportOpen}
        onClose={closeTransportModal}
        fullWidth
        maxWidth="md"
      >
        <TransportUsage
          open={isTransportOpen}
          handleClose={closeTransportModal}
          transportsEmissions={transportsEmissions}
          setTransportsEmission={setTransportsEmission}
        />
      </Dialog>

      {/* Modale per gestione utilizzo energia */}
      <Dialog
        open={isEnergyOpen}
        onClose={closeEnergyModal}
        fullWidth
        maxWidth="md"
      >
        <EnergyUsage
          open={isEnergyOpen}
          handleClose={closeEnergyModal}
          energyEmissions={energyEmissions}
          setEnergyEmission={setEnergyEmission}
          defaultDevicesData={defaultDevicesData}
          setDefaultDevicesData={setDefaultDevicesData}
        />
      </Dialog>

      {/* Modale per gestione rifiuti */}
      <Dialog
        open={isWasteOpen}
        onClose={closeWasteModal}
        fullWidth
        maxWidth="md"
      >
        <WasteUsage
          open={isWasteOpen}
          handleClose={closeWasteModal}
          wasteEmissions={wasteEmissions}
          setWasteEmission={setWasteEmission}
        />
      </Dialog>

      {/* Modale per gestione piantare alberi */}
      <Dialog
        open={isPlantTreeOpen}
        onClose={closePlantTreeModal}
        fullWidth
        maxWidth="md"
      >
        <PlantTreeModal
          open={isPlantTreeOpen}
          handleClose={closePlantTreeModal}
          availableTrees={availableTrees}
          setAvailableTrees={setAvailableTrees}
        />
      </Dialog>

      {/* Modale per gestione abitudini */}
      <Dialog
        open={isMyHabitsOpen}
        onClose={closeMyHabitsModal}
        fullWidth
        maxWidth="md"
      >
        <MyHabitsModal
          open={isMyHabitsOpen}
          handleClose={closeMyHabitsModal}
          myHabitsData={myHabitsData}
          setMyHabitsData={setMyHabitsData}
          myTHabitsValue={myTHabitsValue}
          setMyTHabitsValue={setMyTHabitsValue}
          myEHabitsValue={myEHabitsValue}
          setMyEHabitsValue={setMyEHabitsValue}
        />
      </Dialog>
    </div>
  );
}

export default App;

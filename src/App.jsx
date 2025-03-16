// Manages app structure & navigation

import "./App.css";
import React from "react";
import TableOverview from "./components/TableOverview";

function App() {
  return (
    <div>
      <h1>Restaurant Dashboard</h1>
      <TableOverview />
    </div>
  );
}

export default App;

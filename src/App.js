import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import User from "./user/pages/user";
import NewPlace from "./places/pages/NewPlace";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="places/new" element={<NewPlace />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

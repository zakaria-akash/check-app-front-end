import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import User from "./user/pages/user";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

function App() {
  return (
    <div className="App">
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="places/new" element={<NewPlace />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

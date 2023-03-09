import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import User from "./user/pages/user";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Authentication from "./user/pages/authentication";

function App() {
  return (
    <div className="App">
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="places/new" element={<NewPlace />} />
          <Route path=":userId/places" element={<UserPlaces />} />
          <Route path="places/:placeId" element={<UpdatePlace />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

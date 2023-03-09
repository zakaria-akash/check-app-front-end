import React, { useCallback, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import User from "./user/pages/user";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Authentication from "./user/pages/authentication";
import { AuthContext } from "./shared/context/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logIn = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logOut = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, logIn: logIn, logOut: logOut }}
    >
      <div className="App">
        <MainNavigation />
        <main>
          <Routes>
            <Route path="/" element={<User />} />
            {isLoggedIn && <Route path="places/new" element={<NewPlace />} />}
            <Route path=":userId/places" element={<UserPlaces />} />
            {isLoggedIn && (
              <Route path="places/:placeId" element={<UpdatePlace />} />
            )}
            {!isLoggedIn && <Route path="auth" element={<Authentication />} />}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </AuthContext.Provider>
  );
}

export default App;

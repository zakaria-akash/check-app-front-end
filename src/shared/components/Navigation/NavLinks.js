import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";

import classes from "./NavLinks.module.css";

const NavLinks = () => {
  const AuthCtx = useContext(AuthContext);

  return (
    <ul className={classes.navLinks}>
      <li>
        <NavLink to="/" end>
          All Users
        </NavLink>
      </li>
      {AuthCtx.isLoggedIn && (
        <li>
          <NavLink to={`/${AuthCtx.userId}/places`}>My Places</NavLink>
        </li>
      )}
      {AuthCtx.isLoggedIn && (
        <li>
          <NavLink to="/places/new">Add Place</NavLink>
        </li>
      )}
      {!AuthCtx.isLoggedIn && (
        <li>
          <NavLink to="/auth">Authenticate</NavLink>
        </li>
      )}
      {AuthCtx.isLoggedIn && (
        <li>
          <button onClick={AuthCtx.logOut}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;

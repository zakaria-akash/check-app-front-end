import React from "react";
import { Link } from "react-router-dom";

import classes from "./CustomButton.module.css";

const CustomButton = (props) => {
  let sizeClass = "";
  let inverseClass = "";
  let dangerClass = "";
  if (props.danger) {
    dangerClass = classes.button_danger;
  }
  if (props.inverse) {
    inverseClass = classes.button_inverse;
  }
  if (props.size === "small") {
    sizeClass = classes.button_small;
  } else if (props.size === "big") {
    sizeClass = classes.button_big;
  }
  if (props.href) {
    return (
      <a
        className={`${classes.button} ${sizeClass} ${inverseClass} ${dangerClass}`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={`${classes.button} ${sizeClass} ${inverseClass} ${dangerClass}`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`${classes.button} ${sizeClass} ${inverseClass} ${dangerClass}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default CustomButton;

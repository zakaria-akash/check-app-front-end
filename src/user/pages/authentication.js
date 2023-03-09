import React, { useContext, useState } from "react";
import CustomButton from "../../shared/components/FormElements/CustomButton";
import NewPlaceInputForm from "../../shared/components/FormElements/NewPlaceInputForm";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";
import { useCustomFormHook } from "../../shared/custom-hooks/custom-form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/Validators";

import classes from "./authentication.module.css";

const Authentication = () => {
  const AuthCtx = useContext(AuthContext);
  const [isLogInMode, setIsLogInMode] = useState(true);
  const [formState, inputHandler, setFormData] = useCustomFormHook(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = (e) => {
    e.preventDefault();

    AuthCtx.logIn();

    console.log(formState.inputs);
    // if (formState.isValid) {
    //   alert("Given data has been submitted!"); //will send this data to backend server
    // }
  };

  const switchModeHandler = () => {
    if (!isLogInMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLogInMode((preVal) => !preVal);
  };

  return (
    <Card className={classes.authentication}>
      <h2>Login Required!</h2>
      <hr />
      <form id="authForm" onSubmit={authSubmitHandler}>
        {!isLogInMode && (
          <NewPlaceInputForm
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your name"
            onInput={inputHandler}
          />
        )}
        <NewPlaceInputForm
          element="input"
          id="email"
          type="email"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />

        <NewPlaceInputForm
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password at least 5 characters."
          onInput={inputHandler}
        />

        <CustomButton danger type="submit" disabled={!formState.isValid}>
          {isLogInMode ? "LOGIN" : "SIGNUP"}
        </CustomButton>
      </form>
      <CustomButton inverse onClick={switchModeHandler}>
        {isLogInMode ? "SIGN UP" : "LOGIN"}
      </CustomButton>
    </Card>
  );
};

export default Authentication;

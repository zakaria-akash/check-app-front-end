import React, { useCallback, useReducer } from "react";
import CustomButton from "../../shared/components/FormElements/CustomButton";

import NewPlaceInputForm from "../../shared/components/FormElements/NewPlaceInputForm";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/Validators";

import classes from "./NewPlace.module.css";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid,
      };

    default:
      return state;
  }
};

const NewPlace = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      //not required initially now, but added for consistency
      address: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const newPlaceSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs);
    if (formState.isValid) {
      alert("Given data has been submitted!"); //will send this data to backend server
    }
  };

  return (
    <form className={classes.placeForm} onSubmit={newPlaceSubmitHandler}>
      <NewPlaceInputForm
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        errorText="Please enter a valid title!"
      />
      <NewPlaceInputForm
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
        errorText="Please enter description at least 5 characters!"
      />
      <NewPlaceInputForm
        id="address"
        element="input"
        type="text"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        errorText="Please enter a valid address!"
      />
      <CustomButton
        danger
        size="big"
        type="submit"
        disabled={!formState.isValid}
      >
        Add Place
      </CustomButton>
    </form>
  );
};

export default NewPlace;

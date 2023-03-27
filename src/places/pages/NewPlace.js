import React from "react";
import CustomButton from "../../shared/components/FormElements/CustomButton";

import NewPlaceInputForm from "../../shared/components/FormElements/NewPlaceInputForm";
import Card from "../../shared/components/UIElements/Card";
import { useCustomFormHook } from "../../shared/custom-hooks/custom-form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/Validators";

import classes from "./NewPlace.module.css";

const NewPlace = () => {
  const [formState, inputHandler] = useCustomFormHook(
    {
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

      lng: {
        value: null,
        isValid: false,
      },

      lat: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const newPlaceSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs);
    if (formState.isValid) {
      alert("Given data has been submitted!"); //will send this data to backend server
    }
  };

  return (
    <form onSubmit={newPlaceSubmitHandler}>
      <Card className={classes.placeForm}>
        <NewPlaceInputForm
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title!"
          onInput={inputHandler}
        />
        <NewPlaceInputForm
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter description at least 5 characters!"
          onInput={inputHandler}
        />
        <NewPlaceInputForm
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address!"
          onInput={inputHandler}
        />
        <NewPlaceInputForm
          id="lng"
          element="input"
          type="number"
          label="Address Longitude"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter the valid longitude for given address!"
          onInput={inputHandler}
        />
        <NewPlaceInputForm
          id="lat"
          element="input"
          type="number"
          label="Address Latitude"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter the valid latitude for given address!"
          onInput={inputHandler}
        />
        <CustomButton
          danger
          size="big"
          type="submit"
          disabled={!formState.isValid}
        >
          Add Place
        </CustomButton>
      </Card>
    </form>
  );
};

export default NewPlace;

import React from "react";

import NewPlaceInputForm from "../../shared/components/FormElements/NewPlaceInputForm";
import { VALIDATOR_REQUIRE } from "../../shared/utils/Validators";

import classes from "./NewPlace.module.css";

const NewPlace = () => {
  return (
    <form className={classes.placeForm}>
      <NewPlaceInputForm
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title!"
      />
    </form>
  );
};

export default NewPlace;

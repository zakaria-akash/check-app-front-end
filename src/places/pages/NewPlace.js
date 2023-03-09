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
      </Card>
    </form>
  );
};

export default NewPlace;

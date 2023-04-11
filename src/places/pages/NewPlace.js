import React, { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../shared/components/FormElements/CustomButton";

import NewPlaceInputForm from "../../shared/components/FormElements/NewPlaceInputForm";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useCustomFormHook } from "../../shared/custom-hooks/custom-form-hook";
import { useHttpRequest } from "../../shared/custom-hooks/custom-http-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/Validators";

import classes from "./NewPlace.module.css";

const NewPlace = () => {
  const AuthCtx = useContext(AuthContext);
  const { isLoading, errorMsg, sendRequest, clearError } = useHttpRequest();
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

  const navigate = useNavigate();

  const newPlaceSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(formState.inputs);

    try {
      await sendRequest(
        "http://localhost:5000/api/places",
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          lng: formState.inputs.lng.value,
          lat: formState.inputs.lat.value,
          creator: AuthCtx.userId,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      //for successful send request we will redirect to different page
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <ErrorModal errorMsg={errorMsg} onClear={clearError} />
      <form onSubmit={newPlaceSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
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
    </Fragment>
  );
};

export default NewPlace;

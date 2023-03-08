import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomButton from "../../shared/components/FormElements/CustomButton";
import NewPlaceInputForm from "../../shared/components/FormElements/NewPlaceInputForm";
import Card from "../../shared/components/UIElements/Card";
import { useCustomFormHook } from "../../shared/custom-hooks/custom-form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/Validators";

import classes from "./UpdatePlace.module.css";

const Sample_Places = [
  {
    id: "p1",
    title: "Madaripur Sokuni Lake",
    description:
      "Sokuni Lake is a spectacular place in the natural beauty of Madaripur district. It is located at the heart of Madaripur city",
    imageUrl:
      "https://vromonguide.com/wp-content/uploads/madaripur-sokuni-lake.jpg",
    address: "Madaripur Sadar, Madaripur, Dhaka, Bangladesh 7900",
    location: {
      lat: 23.1661525,
      lng: 90.2058498,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Madaripur Sokuni Lake",
    description:
      "Sokuni Lake is a spectacular place in the natural beauty of Madaripur district. It is located at the heart of Madaripur city",
    imageUrl:
      "https://vromonguide.com/wp-content/uploads/madaripur-sokuni-lake.jpg",
    address: "Madaripur Sadar, Madaripur, Dhaka, Bangladesh 7900",
    location: {
      lat: 23.1661525,
      lng: 90.2058498,
    },
    creator: "u2",
  },
  {
    id: "p3",
    title: "Madaripur Sokuni Lake",
    description:
      "Sokuni Lake is a spectacular place in the natural beauty of Madaripur district. It is located at the heart of Madaripur city",
    imageUrl:
      "https://vromonguide.com/wp-content/uploads/madaripur-sokuni-lake.jpg",
    address: "Madaripur Sadar, Madaripur, Dhaka, Bangladesh 7900",
    location: {
      lat: 23.1661525,
      lng: 90.2058498,
    },
    creator: "u3",
  },
];

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useCustomFormHook(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const identifiedPlace = Sample_Places.find((place) => place.id === placeId);

  useEffect(() => {
    identifiedPlace &&
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  if (!identifiedPlace) {
    return (
      <Fragment>
        <Card className={`center ${classes.noPlaceCard}`}>
          <div>
            <h2>No places found. You can create one. </h2>
          </div>
        </Card>
        <Card className={`center ${classes.noPlaceCard}`}>
          <CustomButton to="/places/new" danger size="big">
            Share Place
          </CustomButton>
        </Card>
      </Fragment>
    );
  }

  const updatePlaceSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs);
    if (formState.isValid) {
      alert("Given data has been submitted!"); //will send this data to backend server
    }
  };

  if (isLoading) {
    return (
      <Fragment>
        <Card className={`center ${classes.noPlaceCard}`}>
          <div>
            <h2>Places could not be loaded. You can create one. </h2>
          </div>
        </Card>
        <Card className={`center ${classes.noPlaceCard}`}>
          <CustomButton to="/places/new" danger size="big">
            Share Place
          </CustomButton>
        </Card>
      </Fragment>
    );
  }

  return (
    <form className={classes.placeForm} onSubmit={updatePlaceSubmitHandler}>
      <NewPlaceInputForm
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        errorText="Please enter a valid title!"
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <NewPlaceInputForm
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
        errorText="Please enter description at least 5 characters!"
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <CustomButton
        danger
        size="big"
        type="submit"
        disabled={!formState.isValid}
      >
        Update Place
      </CustomButton>
    </form>
  );
};

export default UpdatePlace;

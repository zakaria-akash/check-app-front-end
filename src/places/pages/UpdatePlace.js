import React, { Fragment, useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

import classes from "./UpdatePlace.module.css";

// const Sample_Places = [
//   {
//     id: "p1",
//     title: "Empire State Building",
//     description:
//       "One of the most famous sky scrapers in the world! The Empire State Building is a 102-story Art Deco skyscraper in Midtown Manhattan, New York City.",
//     imageUrl: "https://media.timeout.com/images/101705309/image.jpg",
//     address: "20 W 34th St., New York, NY 10001, United States",
//     location: {
//       lat: 40.7484474,
//       lng: -73.9871516,
//     },
//     creator: "u1",
//   },
//   {
//     id: "p2",
//     title: "Madaripur Sokuni Lake",
//     description:
//       "Sokuni Lake is a spectacular place in the natural beauty of Madaripur district. It is located at the heart of Madaripur city",
//     imageUrl:
//       "https://vromonguide.com/wp-content/uploads/madaripur-sokuni-lake.jpg",
//     address: "Madaripur Sadar, Madaripur, Dhaka, Bangladesh 7900",
//     location: {
//       lat: 23.1661525,
//       lng: 90.2058498,
//     },
//     creator: "u2",
//   },
//   {
//     id: "p3",
//     title: "Madaripur Sokuni Lake",
//     description:
//       "Sokuni Lake is a spectacular place in the natural beauty of Madaripur district. It is located at the heart of Madaripur city",
//     imageUrl:
//       "https://vromonguide.com/wp-content/uploads/madaripur-sokuni-lake.jpg",
//     address: "Madaripur Sadar, Madaripur, Dhaka, Bangladesh 7900",
//     location: {
//       lat: 23.1661525,
//       lng: 90.2058498,
//     },
//     creator: "u3",
//   },
// ];

const UpdatePlace = () => {
  const AuthCtx = useContext(AuthContext);
  const { isLoading, errorMsg, sendRequest, clearError } = useHttpRequest();
  const [selectedPlace, setSelectedPlace] = useState();

  const placeId = useParams().placeId;
  const navigate = useNavigate();

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

  // const identifiedPlace = Sample_Places.find((place) => place.id === placeId);

  useEffect(() => {
    const fetchSelectedPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        );

        setSelectedPlace(responseData.place);

        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchSelectedPlace();
  }, [sendRequest, placeId, setFormData]);

  const updatePlaceSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(formState.inputs);

    try {
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      navigate("/" + AuthCtx.userId + "/places");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <Fragment>
        <Card className={`center ${classes.noPlaceCard}`}>
          <LoadingSpinner />
        </Card>
      </Fragment>
    );
  }

  if (!selectedPlace && !errorMsg) {
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

  return (
    <Fragment>
      <ErrorModal errorMsg={errorMsg} onClear={clearError} />
      {!isLoading && selectedPlace && (
        <form onSubmit={updatePlaceSubmitHandler}>
          <Card className={classes.placeForm}>
            <NewPlaceInputForm
              id="title"
              element="input"
              type="text"
              label="Title"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              errorText="Please enter a valid title!"
              initialValue={selectedPlace.title}
              initialValid={true}
            />
            <NewPlaceInputForm
              id="description"
              element="textarea"
              label="Description"
              validators={[VALIDATOR_MINLENGTH(5)]}
              onInput={inputHandler}
              errorText="Please enter description at least 5 characters!"
              initialValue={selectedPlace.description}
              initialValid={true}
            />
            <CustomButton
              danger
              size="big"
              type="submit"
              disabled={!formState.isValid}
            >
              Update Place
            </CustomButton>
          </Card>
        </form>
      )}
    </Fragment>
  );
};

export default UpdatePlace;

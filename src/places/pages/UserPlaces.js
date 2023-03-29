import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpRequest } from "../../shared/custom-hooks/custom-http-hook";
import PlaceList from "../components/PlaceList";

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

const UserPlaces = () => {
  const [selectedPlaces, setSelectedPlaces] = useState();
  const { isLoading, errorMsg, sendRequest, clearError } = useHttpRequest();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchSelectedPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );
        setSelectedPlaces(responseData.places);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSelectedPlaces();
  }, [sendRequest, userId]);
  // const selectedPlace = Sample_Places.filter(
  //   (place) => place.creator === userId
  // );
  return (
    <Fragment>
      <ErrorModal errorMsg={errorMsg} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && selectedPlaces && <PlaceList items={selectedPlaces} />}
    </Fragment>
  );
};

export default UserPlaces;

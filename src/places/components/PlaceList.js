import React, { Fragment } from "react";

import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import CustomButton from "../../shared/components/FormElements/CustomButton";

import classes from "./PlaceList.module.css";

const PlaceList = (props) => {
  if (props.items.length === 0) {
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
    <ul className={classes.placeList}>
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
};

export default PlaceList;

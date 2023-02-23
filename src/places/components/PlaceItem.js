import React, { Fragment, useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import CustomButton from "../../shared/components/FormElements/CustomButton";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";

import classes from "./PlaceItem.module.css";

const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  return (
    <Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass={classes.placeItem__modal_content}
        footerClass={classes.placeItem__modal_actions}
        footer={
          <CustomButton danger onClick={closeMapHandler}>
            CLOSE
          </CustomButton>
        }
      >
        <div className={classes.mapContainer}>
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <li className={classes.placeItem}>
        <Card className={classes.placeItem__content}>
          <div className={classes.placeItem__image}>
            <img src={props.image} alt={props.title} />
          </div>
          <div className={classes.placeItem__info}>
            <h2>{props.title}</h2>
            <h3>
              <address>{props.address}</address>
            </h3>
            <p>{props.description}</p>
          </div>
          <div className={classes.placeItem__actions}>
            <CustomButton inverse onClick={openMapHandler}>
              VIEW ON MAP
            </CustomButton>
            <CustomButton to={`/places/${props.id}`}>EDIT</CustomButton>
            <CustomButton danger>DELETE</CustomButton>
          </div>
        </Card>
      </li>
    </Fragment>
  );
};

export default PlaceItem;

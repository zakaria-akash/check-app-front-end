import React, { Fragment, useContext, useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import CustomButton from "../../shared/components/FormElements/CustomButton";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";

import classes from "./PlaceItem.module.css";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpRequest } from "../../shared/custom-hooks/custom-http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const PlaceItem = (props) => {
  const AuthCtx = useContext(AuthContext);

  const { isLoading, errorMsg, sendRequest, clearError } = useHttpRequest();
  const [showMap, setShowMap] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const showDeleteConfirmHandler = () => {
    setShowDeleteConfirmModal(true);
  };
  const cancelDeleteConfirmHandler = () => {
    setShowDeleteConfirmModal(false);
  };
  const deletePlaceHandler = async () => {
    setShowDeleteConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${props.id}`,
        "DELETE"
      );

      props.onDelete(props.id);
    } catch (error) {
      console.log(error);
    }
    console.log(props.title + "place has been deleted from the list!");
  };

  return (
    <Fragment>
      <ErrorModal errorMsg={errorMsg} onClear={clearError} />
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
      <Modal
        show={showDeleteConfirmModal}
        onCancel={cancelDeleteConfirmHandler}
        header="Are you sure?"
        contentClass={classes.placeItem__modal_content}
        footerClass={classes.placeItem__modal_actions}
        footer={
          <Fragment>
            <CustomButton inverse onClick={cancelDeleteConfirmHandler}>
              CANCEL
            </CustomButton>
            <CustomButton danger onClick={deletePlaceHandler}>
              DELETE
            </CustomButton>
          </Fragment>
        }
      >
        <h5>
          Do you want to proceed and delete this place? Please note that it
          cannot be undone thereafter
        </h5>
      </Modal>
      <li className={classes.placeItem}>
        <Card className={classes.placeItem__content}>
          {isLoading && <LoadingSpinner asOverlay />}
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
            {AuthCtx.isLoggedIn && AuthCtx.userId === props.creatorId && (
              <CustomButton to={`/places/${props.id}`}>EDIT</CustomButton>
            )}
            {AuthCtx.isLoggedIn && AuthCtx.userId === props.creatorId && (
              <CustomButton danger onClick={showDeleteConfirmHandler}>
                DELETE
              </CustomButton>
            )}
          </div>
        </Card>
      </li>
    </Fragment>
  );
};

export default PlaceItem;

import React, { Fragment } from "react";

import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";

import classes from "./UsersList.module.css";
import CustomButton from "../../shared/components/FormElements/CustomButton";

const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <Fragment>
        <Card className={`center ${classes.noUserCard}`}>
          <div>
            <h2>No user found. </h2>
          </div>
        </Card>
        <Card className={`center ${classes.noUserCard}`}>
          <CustomButton danger size="big">
            Add User
          </CustomButton>
        </Card>
      </Fragment>
    );
  }

  return (
    <ul className={classes.usersList}>
      {props.items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places.length}
        />
      ))}
    </ul>
  );
};

export default UsersList;

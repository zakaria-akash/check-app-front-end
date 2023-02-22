import React from "react";

import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";

import classes from "./UsersList.module.css";

const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <Card>
        <div className={`center ${classes.usersList}`}>
          <h2>No user found!</h2>
        </div>
      </Card>
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
          placeCount={user.places}
        />
      ))}
    </ul>
  );
};

export default UsersList;

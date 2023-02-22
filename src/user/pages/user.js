import React, { Fragment } from "react";

import UsersList from "../components/UsersList";

const USERS = [
  {
    id: "u1",
    name: "Zakaria Ibrahim",
    image:
      "https://vromonguide.com/wp-content/uploads/madaripur-sokuni-lake.jpg",
    places: 3,
  },
];

const User = () => {
  return (
    <Fragment>
      <UsersList items={USERS} />
    </Fragment>
  );
};

export default User;

import React, { Fragment, useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpRequest } from "../../shared/custom-hooks/custom-http-hook";

import UsersList from "../components/UsersList";

// const USERS = [
//   {
//     id: "u1",
//     name: "Zakaria Ibrahim",
//     image:
//       "https://vromonguide.com/wp-content/uploads/madaripur-sokuni-lake.jpg",
//     places: 3,
//   },
// ];

const User = () => {
  const [loadedUsers, setLoadedUsers] = useState();

  const { isLoading, errorMsg, sendRequest, clearError } = useHttpRequest();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users"
        );

        setLoadedUsers(responseData.users);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [sendRequest]);

  return (
    <Fragment>
      <ErrorModal errorMsg={errorMsg} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </Fragment>
  );
};

export default User;

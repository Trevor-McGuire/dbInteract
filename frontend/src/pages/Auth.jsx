import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { READ_SESSION } from "../utils/query";
import CreateUser from "../components/CreateUser";
import DeleteUser from "../components/DeleteUser";
import CreateSession from "../components/CreateSession";
import DeleteSession from "../components/DeleteSession";

const Auth = () => {
  const { loading, error, data, refetch } = useQuery(READ_SESSION);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {data.readSession ? (
        <>
          <DeleteSession refetch={refetch} />
          <DeleteUser refetch={refetch} />
        </>
      ) : (
        <>
          <CreateUser refetch={refetch} />
          <CreateSession refetch={refetch} />
        </>
      )}
    </div>
  );
};

export default Auth;

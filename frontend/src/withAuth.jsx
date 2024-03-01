import React from 'react';
import { useQuery } from '@apollo/client';
import { CHECK_AUTH } from './utils/queries'; // Import your auth check query
import { Redirect } from 'react-router-dom';

const WithAuth = (Component) => {
  return (props) => {
    const { loading, error, data } = useQuery(CHECK_AUTH);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    if (!data.isAuthenticated) {
      return <Redirect to="/login" />;
    }

    return <Component {...props} />;
  };
};

export default WithAuth;
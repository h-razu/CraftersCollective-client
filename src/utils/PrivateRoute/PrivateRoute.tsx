import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import Loading from "../../pages/Shared/Loading/Loading";

type Props = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: Props) => {
  const location = useLocation();
  const { isLoading, user } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <Loading />;
  }

  if (user.email) {
    return children;
  }

  if (!isLoading && !user.email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;

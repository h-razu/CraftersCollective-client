import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import Loading from "../../pages/Shared/Loading/Loading";

type Props = {
  children: JSX.Element;
};

const SellerRoute = ({ children }: Props) => {
  const location = useLocation();
  const { isLoading, user } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <Loading />;
  }

  if (user.email) {
    if (user.accountType === "seller") {
      return children;
    }
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!isLoading && !user.email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default SellerRoute;

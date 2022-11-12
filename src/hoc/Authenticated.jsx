import { useContext } from "react";
import AppContext from "../providers/AppContext";
import { Navigate } from "react-router";

export default function Authenticated({ children }) {
  const { user } = useContext(AppContext);

  if (!user) {
    return <Navigate to="/home" />;
  }

  return children;
}

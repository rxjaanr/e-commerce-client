import { ReactNode } from "react";
import useSession from "../../utils/hooks/useSession";
import { Navigate } from "react-router-dom";

export default function GuestRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useSession();
  return isAuthenticated ? <Navigate to={"/"} /> : children;
}

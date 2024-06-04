import { ReactNode } from "react";
import useSession from "../../utils/hooks/useSession";
import { Navigate } from "react-router-dom";

export default function GuestRoute({ children }: { children: ReactNode }) {
  const { user } = useSession();
  return user.token !== "" ? <Navigate to={"/"} /> : children;
}

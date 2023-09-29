import useSessionStore from "@/store/sessionStore/session.store";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const sessionData = useSessionStore((state) => state.sessionData);

  useEffect(() => {
    if (!sessionData.login_tokens) {
      router.push("/auth/login");
    }
  }, [sessionData]);
  return (
    <main>
      <h1>Testtt</h1>
    </main>
  );
}

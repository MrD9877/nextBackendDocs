"use client";
import { useSession, signIn, signOut } from "next-auth/react";
export default function Component() {
  const { data: session } = useSession();
  const handleClick = async () => {
    try {
      const res = await fetch("/api/send", { credentials: "include" });
      const data = await res.json();
      console.log(data);
    } catch {
      console.log("error");
    }
  };
  if (session) {
    console.log(session);
    return (
      <>
        Signed in as {session.user.username} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <button onClick={handleClick}>send</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

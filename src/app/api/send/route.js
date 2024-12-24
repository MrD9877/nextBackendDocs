import jwt from "jsonwebtoken";
import { useSession, signIn, signOut } from "next-auth/react";
export async function GET(request) {
  const token = request.cookies.get("next-auth.csrf-token").value;
  try {
    const user = jwt.verify(token, "secret");
    console.log(user);
  } catch (err) {
    console.log(err);
  }
  return Response.json({ message: "Hello World" });
}

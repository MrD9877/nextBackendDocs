import dbConnect from "@/app/lib/dbConnect";
import { cookies } from "next/headers";
import { User } from "@/model/user";
import { generateAccessToken, verifyAccessToken } from "@/app/lib/token";

dbConnect();
export async function GET() {
  return Response.json({ message: "Hello World" });
}

export async function POST(request) {
  const body = await request.json();
  const { username, password } = body;
  const cookieStore = await cookies();

  cookieStore.set("new", "cookie");
  const expiresIn = "1m";
  const session = generateAccessToken({ username }, expiresIn);
  cookieStore.set("session", session, { expiresIn: expiresIn });
  const user = new User({ username, password });
  try {
    await user.save();
  } catch (e) {
    return new Response(JSON.stringify({ msg: e }), { status: 500 });
  }
  return new Response(JSON.stringify({ msg: "wlc" }), { status: 201 });
}

export async function PUT(request) {
  const session = request.cookies.get("session");
  const user = verifyAccessToken(session.value);
  if (user.username) {
    return new Response(JSON.stringify({ user: user.username }), { status: 200 });
  }
  return new Response(JSON.stringify({ msg: "Unauthorized" }), { status: 401 });
}

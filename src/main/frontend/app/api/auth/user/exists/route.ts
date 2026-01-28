import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/user/exists?email=${encodeURIComponent(email)}`,
    {
      method: "GET",
    },
  );
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

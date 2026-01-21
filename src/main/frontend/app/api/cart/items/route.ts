import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const res = await fetch("http://backend:8080/api/cart/items", {
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "X-USER-ID": request.headers.get("x-user-id") ?? "",
    },
    method: "POST",
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

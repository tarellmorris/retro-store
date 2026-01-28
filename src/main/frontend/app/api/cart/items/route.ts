import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/cart/items`,
    {
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    },
  );
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

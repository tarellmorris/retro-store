import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const backendUrl = new URL(`${process.env.NEXT_PUBLIC_API_BASE}api/games`);
  backendUrl.search = searchParams.toString();

  const res = await fetch(backendUrl.toString(), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

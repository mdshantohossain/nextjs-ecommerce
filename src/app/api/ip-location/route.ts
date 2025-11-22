import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://ipwho.is/");
    const data = await res.json();

    return NextResponse.json({
      country: data.country || "",
      city: data.city || "",
    });
  } catch (err) {
    return NextResponse.json({
      country: "",
      city: "",
    });
  }
}

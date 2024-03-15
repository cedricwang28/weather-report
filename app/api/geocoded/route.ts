import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";

export async function GET(req: NextRequest) {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const searchParams = req.nextUrl.searchParams;
  try {
    const city = searchParams.get("search");
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

    const res = await axios.get(url);

    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error fetching geocoded data");
    if (isDynamicServerError(error)) {
      throw error;
    }
    return new Response("Error fetching geocoded data", { status: 500 });
  }
}

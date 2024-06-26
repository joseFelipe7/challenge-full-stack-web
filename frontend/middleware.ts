import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
export async function middleware(request: NextRequest) {
  const token = getCookie("token", { cookies });
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  try {
    const response = await axios.get("http://localhost:3030/logged", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/user/:path*", "/patient/:path*"],
};

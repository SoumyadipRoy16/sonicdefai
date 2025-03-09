"use server";

import { headers } from "next/headers";

export async function getCookiesFromHeaders(): Promise<string> {
  const headersList = await headers();
  return headersList.get("cookie") || "";
}
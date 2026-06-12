export function getApiBase() {
  if (typeof window === "undefined") {
    return process.env.INTERNAL_API_BASE ?? "http://localhost:8080";
  }

  return "";
}

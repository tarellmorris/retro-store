export function getApiBase() {
  if (typeof window === "undefined") {
    return process.env.INTERNAL_API_BASE;
  }

  return "";
}
